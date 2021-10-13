from django.urls import path
from VistasGenerales.views import inicio

urlpatterns = [
    path('', inicio),
]
