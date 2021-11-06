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
from .serializers import DiaSerializer, HoraSerializer, SimpleHoraSerializer, ReservaSerializer, SimpleReservaSerializer
from rest_framework.renderers import JSONRenderer
from GestionUsuarios.models import Administrador, Docente, Empleado, Notificacion
from GestionMaterias.models import Horario,Dia,Hora, Materia, Catedra, EsParteDe
from GestionLocales.models import Local
from django.core import serializers

# Create your views here.
#El siguiente metodo requiere el codigo del horario, el codigo del local y un usuario logeado
#El usuario tiene que estar registrado como coordinador de una catedra
#El siguiente usuario cumple con las caracteristicas listadas
#email: docente1@ues.edu.sv     password: 12345678
@csrf_exempt
def nueva_reserva(request):
    respuesta ={
        "type":"error",
        "state":True,
        "creado":False,
        "message":"",
        "sesionCaducada":False
    }
    """
    token = request.POST.get("token")
    if request.session.session_key:
        print(token)
        print(request.session.session_key)
        print("Se puede")
    else:
        print("no funciono")
    """

    if request.session.session_key:
        if request.method == "POST":
            try:
                cod_empleado= request.user.cod_empleado
                cod_horario = request.POST.get("cod_horario")
                cod_local = request.POST.get("cod_local")

                docente=Docente.objects.get(cod_empleado=cod_empleado)
                print (docente.dui)
                try:
                    esparte= EsParteDe.objects.get(dui=docente.dui, coordinador=True)
                    print(esparte)
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
            except:
                respuesta["sesionCaducada"]=True
                respuesta["message"]="La sesión a caducado"
                return JsonResponse(respuesta, safe=False)
        else:
            respuesta["message"]="Los datos no fueron enviados de forma segura"
            return JsonResponse(respuesta, safe=False)
    else:
        respuesta["sesionCaducada"]=True
        respuesta["message"]="El usuario no esta logeado"
        return JsonResponse(respuesta, safe=False)

def crear_notificación(reserva):
    notificacion = Notificacion()
    notificacion.cod_empleado=reserva.doc_dui.cod_empleado
    notificacion.cod_reserva=reserva
    notificacion.visto=False
    notificacion.fecha=datetime.now()
    notificacion.hora=timezone.now().astimezone()
    notificacion.titulo= "Reserva: "+reserva.estado_solicitud
    notificacion.save()

#El siguiente metodo recibe el codigo de solicitud y el nuevo estado (Aprobado/Denegado) 
#Es necesario ocupar un usuario registrado como administrador.
#codAdmin, cod_reserva, estado
#email: patoso77@ues.edu.sv     password: 3enero1999
@csrf_exempt
def cambiar_estado(request):
    respuesta ={
        "type":"error",
        "aprobado":False,
        "state": True,
        "message":"Hay un error en los datos enviados."
    }
    try:
        codigoAdmin = request.POST.get("codAdmin")
        print(codigoAdmin)
        administrador = Administrador.objects.get(dui=codigoAdmin)  
        print(administrador)
        try:
            cod_reserva = request.POST.get("cod_reserva")
            print(cod_reserva)
            estado = request.POST.get("estado")
            print(estado)
            
            reserva=Reserva.objects.get(cod_reserva=cod_reserva)
            reserva.estado_solicitud=estado
            reserva.adm_cod_empleado=administrador
            reserva.fecha_aprobacion=timezone.now()

            if estado == "Denegado":
                reserva.save()
                crear_notificación(reserva)
                respuesta["message"]="El estado de la solicitud fue actualizado exitosamente."
            
            elif estado == "Aprobado":
                Reserva.objects.filter(cod_horario=reserva.cod_horario, cod_local= reserva.cod_local
                        ).update(estado_solicitud="Denegado", adm_cod_empleado=administrador.dui, fecha_aprobacion=timezone.now())           
                reserva.save()
                
                #Notificaciones              
                reservas=list(Reserva.objects.filter(cod_horario=reserva.cod_horario, cod_local= reserva.cod_local))
                for i in reservas:
                    crear_notificación(i)

                respuesta["message"]="La solicitud fue aprobada, las otras solicitudes realiazadas para el mismo local en la misma hora fueron denegadas."
            
            respuesta["type"]="success"
            respuesta["aprobado"]=True
            return JsonResponse(respuesta,safe=False)       
        except:
            respuesta["message"]="Los datos no fueron enviados de forma segura o hay un error en el codigo de reservay."
            return JsonResponse(respuesta, safe=False)

    except:
        respuesta["message"]="Solo los administradores pueden cambiar el estado de las solicitudes."
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
        reservas=Reserva.objects.filter(cod_local__cod_local=cod_local,estado_solicitud='Aprobado')
        serializer = ReservaSerializer(reservas, many = True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method =="GET":
        reservas=Reserva.objects.filter(Q(estado_solicitud='Denegado')|Q(estado_solicitud='Aprobado'))
        serializer = ReservaSerializer(reservas, many = True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"Error":'Debe utilizar Metodo POST para consultar Reservas'}, safe=False)      
     
# El siguiente metodo requiere del cod_local y solo retorna 
# las reservas de solicitudes en Proceso     
# @csrf_exempt
def solicitud_body(request):
    if request.method == "POST":
        cod_local = request.POST.get("cod_local")
        reservas=Reserva.objects.filter(cod_local__cod_local=cod_local,estado_solicitud='En Proceso').order_by('cod_horario__cod_dia')          
        serializer = ReservaSerializer(reservas, many = True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method =="GET":
        reservas=Reserva.objects.filter(estado_solicitud='En Proceso').order_by('cod_horario__cod_dia')          
        serializer = ReservaSerializer(reservas, many = True)
        return JsonResponse(serializer.data, safe=False)
    else:
        return JsonResponse({"Error":'No se puede acceder a esta informacion'}, safe=False)       

@csrf_exempt
def get_usuario_solicitud(request):
    if request.method == "POST":
        codReserva = request.POST.get("codigoReserva")
        reserva = list(Reserva.objects.filter(Q(cod_reserva=codReserva)).values())
        docente=list(Docente.objects.filter(Q(dui=reserva[0]["doc_dui_id"])).values()) 
        return JsonResponse(docente[0],safe=False)
    else:
        return JsonResponse({"Error":"No se puede acceder a esta URL"}, safe=False)

#Retorna todo el horario para poder crear la reservaa
@csrf_exempt
def get_horario (request):
    horario = list(Horario.objects.select_related())
    codigo = list(Horario.objects.values('cod_horario'))
    lista= []
    for i in range(len(horario)):
        diccionario={
            "code":0,
            "cod_horario":"",
            "label":""
        }
        diccionario["code"]=i
        diccionario["cod_horario"] = codigo[i]["cod_horario"]
        diccionario["label"] = str(horario[i])
        lista.append(diccionario)
        del diccionario
    return JsonResponse(lista, safe=False)

@csrf_exempt
def get_horario_completo (request):
    if request.method == 'POST':
        # recuperando local
        try:
            codLocal=request.POST.get('cod_local')
            local=Local.objects.get(pk=codLocal)
        except  Local.DoesNotExist:
            respuesta ={
                    "type":"error",
                    "state": True,
                    "message":'El Local '+str(codLocal)+' no existe.'
            }
            return JsonResponse(respuesta, safe=False)     
           
        reservas=[] # inicializando Array
        row=[] #inicializando fila
        
        # agregando headers
        dias=Dia.objects.all().order_by('cod_dia').values('nombre_dia')
        row.append('Hora') 
        for dia in dias:
            row.append(dia['nombre_dia'])
        reservas.append(row)
        
        #filtrando por hora
        horas=Hora.objects.all()
        for hora in horas:
            row=[] #inicializando nueva fila
            horarios=Horario.objects.filter(cod_hora=hora).order_by('cod_dia')
                    
            # agregando hora
            row.append(str(hora.hora_inicio)+" - "+str(hora.hora_fin))
            
            # agregando reserva en especifica hora, local y dia, tomando en cuenta que esta aceptada, solo trae la primera aceptada, asi que por ende solo deberia haber una
            for horario in horarios:
                # filtrando reservas en este horario, solo trae el primero que cumpla las condiciones   
                reserva=horario.reserva_set.filter(cod_local=local,estado_solicitud='ACEPTADA').first()
            
                #  en caso de no devolver ninguno agrega una cadena vacia
                if reserva is not None:
                    materia=reserva.cod_materia
                    row.append(str(materia))
                else:
                    row.append("")
                            
            reservas.append(row)# guardando fila de horario
    
        return JsonResponse(reservas, safe=False)   
    else:
        respuesta ={
        "type":"error",
        "state": True,
        "message":'No se puede acceder a esta informacion, debe utilizar Metodo POST.'
    }
        return JsonResponse(respuesta, safe=False)        
              
              
