from django.http import HttpResponse
from django.template.loader import render_to_string
from weasyprint import HTML
import tempfile
#from .models import Local

def reporte_materias(request):
    #locales = Local.objects.all()
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