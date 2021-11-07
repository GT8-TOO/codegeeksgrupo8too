from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
from GestionLocales.models import Escuela, Local
from GestionMaterias.models import Materia
from GestionReservas.models import Reserva
#from .models import Local

def reporte_materias(request,idMateria):
    #locales = Local.objects.all()
    materia = Materia.objects.get(pk=idMateria) 
    reserva = Reserva.objects.filter(cod_materia=materia)
    horas = ['06:20','08:05','09:50','11:35','01:20','03:05','04:50','06:35']
    objeto = []

    html_string = render_to_string('reporte/reporte_maeterias.html',{})
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