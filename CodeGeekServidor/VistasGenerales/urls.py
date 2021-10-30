from django.urls import path
from VistasGenerales.views import *

urlpatterns = [
    #Primera vista
    path('', inicio),

    #Registrarse y iniciar sesion
    path('login/', vista_login),
    path('register/', vista_registrarse),

    #Usuario
    path('user/home/', vista_usuario_home),
    path('user/profile/', vista_usuario_profile),
    path('user/requestlocal/', vista_usuario_requestlocal),
    path('user/reviewrequest/', vista_usuario_reviewrequest),
    path('user/local/', vista_usuario_local),
    path('user/report/', vista_usuario_report),
    path('user/sendemail/', vista_usuario_sendemail),
    path('user/registercarrer/', vista_usuario_registercarrer),
    path('user/start/', vista_usuario_start),
    path('user/authorize/', vista_usuario_authorize),
]
