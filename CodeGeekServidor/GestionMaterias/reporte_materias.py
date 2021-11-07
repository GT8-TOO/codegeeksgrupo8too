from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
from GestionLocales.models import Escuela, Local
from GestionMaterias.models import Materia
from GestionReservas.models import Reserva
#from .models import Local
#ADD
#Tiempo
from datetime import datetime, timedelta
#Contar
from collections import Counter
from collections import defaultdict

def reporte_materias(request,idMateria):
    #locales = Local.objects.all()
    #materia = Materia.objects.get(pk=idMateria) 
    #reserva = Reserva.objects.filter(cod_materia=materia)
    #horas = ['06:20','08:05','09:50','11:35','01:20','03:05','04:50','06:35']
    #objeto = []
    materias=Materia.objects.get(cod_materia=idMateria)
    reservas = Reserva.objects.filter(cod_materia=materias, estado_solicitud='ACEPTADA')
    locales=Local.objects.all()
    objeto = []
    objeto2 = []
    objeto3 = []
    objeto4 = []
    objeto5 = []
    dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
    horas = ['06:20','08:05','09:50','11:35','01:20','03:05','04:50','06:35']
    html = ''
    html2 = ''
    contadorLocales = 0

    for hora in horas:
        html += '<tr>'
        html += '<td style="width: 4cm;">'+ hora + '</td>'
        for dia in dias:
            html2 = '<td style="width: 4cm;">'+'</td>'
            for reserva in reservas:
                if reserva.cod_horario.cod_dia.nombre_dia == dia and (reserva.cod_horario.cod_hora.hora_inicio).strftime("%H:%M") == hora:
                    html2 = ''
                    html2 += '<td style="width: 4cm;">'+ str(reserva.cod_local.nombre_local) + '</td>'
            html+=html2
        html += '</tr>'
    objeto.append(html)
    for reserva in reservas:
        for local in locales:
            if reserva.cod_local.nombre_local == local.nombre_local:
                #contadorMaterias = contadorMaterias + 1 
                objeto2.append(reserva.cod_local.nombre_local)
                objeto4.append(reserva.cod_horario.cod_dia.nombre_dia)
                #print(reserva.cod_materia.nombre_materia + ',' + str(reserva.cod_reserva) + ',' + str(reserva.cod_local)+','+str(reserva.cod_horario))
    contadorLocales = Counter(objeto2)
    contadorDias = Counter(objeto4)

     
    for a in contadorDias:
        objeto5.append({'dias':a,'cantidad':contadorDias[a]})
    #Horarios por materia
    ##print(contadorMaterias)
    for a in contadorLocales:
        objeto3.append({'local':a,'cantidad':contadorLocales[a]})
    #Por cuantos días
    
    contexto = {'objeto':objeto, 'materia':materias, 'contadorLocales':len(contadorLocales),'objeto3':objeto3,'objeto5':objeto5}
    html_string = render_to_string('reporte_materias.html',contexto)
    html = HTML(string=html_string)
    result = html.write_pdf()
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="reporte_materias.pdf"'
    response['Content-Transfer-Encoding'] = 'binary'
    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())
    return response