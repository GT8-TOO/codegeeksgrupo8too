from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
from .models import Local
from GestionReservas.models import Reserva 
#Tiempo
from datetime import datetime, timedelta

def reporte_local(request, idLocal):
    locales = Local.objects.get(cod_local=idLocal)
    reservas = Reserva.objects.filter(cod_local=locales)
    objeto = []
    dias = ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado']
    horas = ['6:20','8:05-9:45','9:50-11:30','11:35-1:15','1:20-3:00','3:05-3:45','4:50-6:30','4:50-6:30']
    html = ''
    #for dia in dias:  
    #    objeto.append({'reservas':reservas, 'dia':dia})
    #print(objeto)
    #contexto = {'objeto':objeto, 'local':locales, 'dias':dias, 'horas':horas, 'html':html}
    for hora in horas:
        html += '<tr>'
        html += '<td style="width: 4cm;">'+ hora + '</td>'
        for dia in dias:
            for reserva in reservas:
                print((reserva.cod_horario.cod_hora.hora_inicio).strftime("%H:%M"))
                if reserva.cod_horario.cod_dia.nombre_dia == dia and (reserva.cod_horario.cod_hora.hora_inicio).strftime("%H:%M")=='6:20':
                    html += '<td style="width: 4cm;"> Prueba'+ str(reserva.cod_reserva) + '</td>'
                else:
                    html += '<td style="width: 4cm;">'+ '</td>'
        html += '</tr>'
    objeto.append(html)

    contexto = {'objeto':objeto}
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

def reporte_escuelas(request):
    #locales = Local.objects.all()
    html_string = render_to_string('reporte/reporte_escuela.html',{})
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