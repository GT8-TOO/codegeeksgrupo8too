from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
from .models import Local
from .models import Escuela
from GestionReservas.models import Reserva 
from GestionMaterias.models import Materia ,Pensum,Imparte


#Tiempo
from datetime import datetime, timedelta
#Contar
from collections import Counter
from collections import defaultdict
#Para generar el reporte
##Se tiene que iterar objeto para
##Generar URL Dinamica
#{% url 'reporte_local' idLocal=objeto.cod_local %}
def reporte_local(request, idLocal):
    locales = Local.objects.get(cod_local=idLocal)
    reservas = Reserva.objects.filter(cod_local=locales, estado_solicitud='Aprobado')
    materias = Materia.objects.all()
    objeto = []
    objeto2 = []
    objeto3 = []
    objeto4 = []
    objeto5 = []
    dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
    horas = ['06:20','08:05','09:50','11:35','01:20','03:05','04:50','06:35']
    html = ''
    html2 = ''
    contadorMaterias = 0

    for hora in horas:
        html += '<tr>'
        html += '<td style="width: 4cm;">'+ hora + '</td>'
        for dia in dias:
            html2 = '<td style="width: 4cm;">'+'</td>'
            for reserva in reservas:
                if reserva.cod_horario.cod_dia.nombre_dia == dia and (reserva.cod_horario.cod_hora.hora_inicio).strftime("%H:%M") == hora:
                    html2 = ''
                    html2 += '<td style="width: 4cm;">'+ str(reserva.cod_materia.nombre_materia) +'['+str(reserva.doc_dui.nombre)+']'+', '+ '</td>'
            html+=html2
        html += '</tr>'
    objeto.append(html)
    for reserva in reservas:
        for materia in materias:
            if reserva.cod_materia.nombre_materia == materia.nombre_materia:
                #contadorMaterias = contadorMaterias + 1 
                objeto2.append(reserva.cod_materia.nombre_materia)
                objeto4.append(reserva.cod_horario.cod_dia.nombre_dia)
                #print(reserva.cod_materia.nombre_materia + ',' + str(reserva.cod_reserva) + ',' + str(reserva.cod_local)+','+str(reserva.cod_horario))
    contadorMaterias = Counter(objeto2)
    contadorDias = Counter(objeto4)

    for a in contadorDias:
        objeto5.append({'dias':a,'cantidad':contadorDias[a]})
    #Horarios por materia
    ##print(contadorMaterias)
    for a in contadorMaterias:
        objeto3.append({'materia':a,'cantidad':contadorMaterias[a]})
    #Por cuantos días
    contexto = {'objeto':objeto, 'local':locales, 'contadorMaterias':len(contadorMaterias),'objeto3':objeto3,'objeto5':objeto5}
    html_string = render_to_string('reporte/reporte_local.html',contexto)
    html = HTML(string=html_string)
    result = html.write_pdf()
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="reporte_local.pdf"'
    response['Content-Transfer-Encoding'] = 'binary'
    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())
    return response

#Para generar el reporte
##Se tiene que iterar objeto para
##Generar URL Dinamica
#{% url 'reporte_local' idLocal=objeto.cod_local %}


def reporte_escuela(request,idEscuela):
    #escuelas = Escuela.objects.get(pk=idEscuela)
    #horas = ['06:20','08:05','09:50','11:35','01:20','03:05','04:50','06:35']
    #objeto = []
 
    escuelas=Escuela.objects.get(cod_escuela=idEscuela)
    
    locales=Local.objects.filter(cod_edificio__cod_escuela__cod_escuela=idEscuela).values_list("cod_local")
   
   
    reservas = Reserva.objects.filter(cod_local__in=locales, estado_solicitud='Aprobado')
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
                    html2 += '<td style="width: 4cm;">'+ str(reserva.cod_local.nombre_local) +'['+str(reserva.cod_materia.nombre_materia)+']'+', '+ '</td>'
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
    
    contexto = {'objeto':objeto, 'escuela':escuelas, 'contadorLocales':len(contadorLocales),'objeto3':objeto3,'objeto5':objeto5}
    html_string = render_to_string('reporte/reporte_escuela.html',contexto)
    html = HTML(string=html_string)
    result = html.write_pdf()
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="reporte_escuela.pdf"'
    response['Content-Transfer-Encoding'] = 'binary'
    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())
    return response

























    contexto = {'id':id}
    html_string = render_to_string('reporte/reporte_escuela.html',contexto)
    html = HTML(string=html_string)
    result = html.write_pdf()
    response = HttpResponse(content_type='application/pdf')
    response['Content-Disposition'] = 'inline; filename="reporte_escuela.pdf"'
    response['Content-Transfer-Encoding'] = 'binary'
    with tempfile.NamedTemporaryFile(delete=True) as output:
        output.write(result)
        output.flush()
        output = open(output.name, 'rb')
        response.write(output.read())
    return response