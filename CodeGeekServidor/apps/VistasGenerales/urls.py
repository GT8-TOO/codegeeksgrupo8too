from django.urls import path
from apps.VistasGenerales.views import inicio

urlpatterns = [
    path('', inicio),
]
