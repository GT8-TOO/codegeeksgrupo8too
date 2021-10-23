from django.db.models.expressions import F
from django.http.response import HttpResponse
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.db.models.query_utils import Q
from datetime import datetime
from GestionLocales.serializers import LocalSerializer
from .models import Reserva
from .serializers import DiaSerializer, HoraSerializer, ReservaSerializer
from rest_framework.renderers import JSONRenderer
from GestionUsuarios.models import Administrador, Docente, Empleado, Notificacion
from GestionMaterias.models import Horario,Dia,Hora, Materia, Catedra, EsParteDe
from GestionLocales.models import Local

# Create your views here.
#El siguiente metodo requiere el codigo del horario, el codigo del local y un usuario logeado
#El usuario tiene que estar registrado como coordinador de una catedra
#El siguiente usuario cumple con las caracteristicas listadas
#email: docente1@ues.edu.sv     password: 12345678
@csrf_exempt
def nueva_reserva(request):
    respuesta ={
        "type":"error",
        "creado":False,
        "message":""
    }
    if request.user.is_authenticated:
        if request.method == "POST":
            cod_empleado= request.user.cod_empleado
            cod_horario = request.POST.get("cod_horario")
            cod_local = request.POST.get("cod_local")

            docente=Docente.objects.get(cod_empleado=cod_empleado)
            try:
                esparte= EsParteDe.objects.get(dui=docente.dui)
                try:
                    if esparte.coordinador==True:    
                        reserva =Reserva()
                        reserva.cod_horario = Horario.objects.get(cod_horario=cod_horario)
                        reserva.cod_local = Local.objects.get(cod_local=cod_local)
                        reserva.doc_dui = esparte.dui
                        reserva.cod_materia=esparte.cod_catedra.cod_materia
                        reserva.estado_solicitud = "En Proceso"
                        reserva.save()
                        respuesta["type"]="success"
                        respuesta["message"]="La reservación se ha registrado correctamente"
                        respuesta["creado"]=True
                        return JsonResponse(respuesta, safe=False)
                    else:
                        respuesta["message"]="Solo los coordinadores pueden solicitar reservas"
                        return JsonResponse(respuesta, safe=False)
                except:
                    respuesta["message"]="El horario o el local proporcionado no estan registrados"
                    return JsonResponse(respuesta, safe=False)
            except:
                respuesta["message"]="El docente actual no esta registrado en ninguna catedra"
                return JsonResponse(respuesta, safe=False)
        else:
            respuesta["message"]="Los datos no fueron enviados de forma segura"
            return JsonResponse(respuesta, safe=False)
    else:
        respuesta["message"]="El usuario no esta logeado"
        return JsonResponse(respuesta, safe=False)

def crear_notificación(reserva):
    notificacion = Notificacion()
    notificacion.cod_empleado=reserva.doc_dui.cod_empleado
    notificacion.cod_reserva=reserva
    notificacion.visto=False
    notificacion.fecha=datetime.now()
    #notificacion.hora=datetime.now().time()
    notificacion.titulo= "Reserva: "+reserva.estado_solicitud
    notificacion.save()

#El siguiente metodo recibe el codigo de solicitud y el nuevo estado (Aprobado/Denegado) 
#Es necesario ocupar un usuario registrado como administrador.
#email: patoso77@ues.edu.sv     password: 3enero1999
@csrf_exempt
def cambiar_estado(request):
    respuesta ={
        "type":"error",
        "aprobado":False,
        "message":"Hay un error en los datos enviados."
    }
    if request.user.is_authenticated:
        if request.user.usuario_administrador==True:
            if request.method == "POST":
                
                cod_reserva = request.POST.get("cod_reserva")
                estado = request.POST.get("estado")
                administrador =Administrador.objects.get(cod_empleado=request.user.cod_empleado)
                reserva=Reserva.objects.get(cod_reserva=cod_reserva)
               
                if estado == "Denegado":
                    Reserva.objects.filter(cod_reserva=cod_reserva).update(estado_solicitud=estado, adm_emp_dui=administrador.dui, fecha_aprobacion=timezone.now())
                    crear_notificación(reserva)
                    respuesta["message"]="El estado de la solicitud fue actualizado exitosamente."
                
                elif estado == "Aprobado":
                    Reserva.objects.filter(cod_horario=reserva.cod_horario, cod_local= reserva.cod_local
                            ).update(estado_solicitud="Denegado", adm_emp_dui=administrador.dui, fecha_aprobacion=timezone.now())           
                    Reserva.objects.filter(cod_reserva=cod_reserva).update(estado_solicitud=estado, adm_emp_dui=administrador.dui)
                    
                    #Notificaciones              
                    reservas=list(Reserva.objects.filter(cod_horario=reserva.cod_horario, cod_local= reserva.cod_local))
                    for i in reservas:
                        crear_notificación(i)

                    respuesta["message"]="La solicitud fue aprobada, las otras solicitudes realiazadas para el mismo local en la misma hora fueron denegadas."
                
                respuesta["type"]="success"
                respuesta["aprobado"]=True
                return JsonResponse(respuesta,safe=False)
            
            else:
                respuesta["message"]="Los datos no se enviaron de forma segura"
                return JsonResponse(respuesta, safe=False)
        else:
            respuesta["message"]="Solo los administradores pueden aprobar solicitudes."
            return JsonResponse(respuesta, safe=False)
    else:
        respuesta["message"]="Es necesario logearse para llevara acabo esta operación."
        return JsonResponse(respuesta, safe=False)

# el siguiente metodo requiere del cod_local para proporcionar los datos del local y el horario (dias y horas)
@csrf_exempt
def horario_headers(request):
        if request.method == "POST":
            cod_local = request.POST.get("cod_local")
            local=Local.objects.get(pk=cod_local)
            dias=Dia.objects.all().order_by('cod_dia')         
            horas=Hora.objects.all()         
            horasSerializer = HoraSerializer(horas, many = True)
            diasSerializer = DiaSerializer(dias, many = True)
            localSerializer=LocalSerializer(local)
            data={'local':localSerializer.data,'dias':diasSerializer.data,'horas':horasSerializer.data}
            
            return JsonResponse(data,safe=True)
        else:
            return JsonResponse({"Error":'Debe utilizar Metodo POST para consultar los Horarios'}, safe=False)  
       
# El siguiente metodo requiere del cod_local y solo retorna 
# las reservas de solicitudes aceptadas     
@csrf_exempt
def horario_body(request):
    if request.method == "POST":
        cod_local = request.POST.get("cod_local")
        reservas=Reserva.objects.filter(cod_local__cod_local=cod_local,estado_solicitud='Aceptada')
        serializer = ReservaSerializer(reservas, many = True)
        
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"Error":'Debe utilizar Metodo POST para consultar Reservas'}, safe=False)      
     
# El siguiente metodo requiere del cod_local y solo retorna 
# las reservas de solicitudes en Proceso     
@csrf_exempt
def solicitud_body(request):
    if request.method == "POST":
        cod_local = request.POST.get("cod_local")
        reservas=Reserva.objects.filter(cod_local__cod_local=cod_local,estado_solicitud='En Proceso').order_by('cod_horario__cod_dia')          
        serializer = ReservaSerializer(reservas, many = True)
        
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"Error":'Debe utilizar Metodo POST para consultar Solicitudes'}, safe=False)       