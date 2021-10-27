from django.urls import path
from VistasGenerales.views import *

urlpatterns = [
    path('', inicio),
    path('login/', vista_login),
    path('register/', vista_registrarse),
    path('user/home/', vista_usuario),
]
