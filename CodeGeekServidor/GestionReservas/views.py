from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from GestionReservas.models import Reserva
from django.contrib.auth import logout
from django.db.models.query_utils import Q
from GestionReservas.models import Reserva
from GestionUsuarios.models import Docente, Empleado
from GestionMaterias.models import Horario
from GestionLocales.models import Local

# Create your views here.
@csrf_exempt
def nueva_reserva(request):
    if request.user.is_authenticated:
        if request.method == "POST":
            cod_empleado= request.user.cod_empleado
            cod_horario = request.POST.get("cod_horario")
            cod_local = request.POST.get("cod_local")
            #Creo que deberiamos agregar el atributo coordinador en catedra y borrarlo de Es_parte_de
            #cod_materia = request.POST.get("cod_materia")
            try:    
                reserva =Reserva()
                reserva.cod_horario = Horario.objects.get(cod_horario=cod_horario)
                reserva.cod_local = Local.objects.get(cod_local=cod_local)
                reserva.doc_dui = Docente.objects.get(cod_empleado=cod_empleado)
                reserva.estado_solicitud = "En Proceso"
                reserva.save()
                return JsonResponse({"Creado":True}, safe=False)

            except:
                return JsonResponse({"Creado":False, "message": "Los datos proporcionados tienen un error"}, safe=False)
        else:
            return JsonResponse({"Creado":False, "message": "Solo se almacenan datos por POST"}, safe=False)
    else:
        return JsonResponse({"Creado":False}, safe=False)