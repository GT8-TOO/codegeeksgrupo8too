from django.urls import path
from GestionUsuarios.views import *

urlpatterns = [
    path('home/', home),
    path('login/', iniciar_sesion),
    path('register/', registrar_usuario),
    path('logout/', logout_usuario),
    path('admin/', registrar_admin),
    path('obtenerusuario-json/', obtener_usuario),
    path('escuela/docentes/', docentes_escuela),
    path('docentes/', docentes_sin_escuela),
]
