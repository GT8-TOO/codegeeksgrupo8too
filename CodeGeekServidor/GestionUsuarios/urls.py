from django.urls import path
from GestionUsuarios.views import *

urlpatterns = [
    path('home/', home),
    path('login/', iniciar_sesion),
    path('register/', registrar_usuario),
    path('admin/', registrar_admin),
]
