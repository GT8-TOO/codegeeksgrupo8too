from django.urls import path
from .consumers import WSConsumer
    
ws_urlpatterns = [
    path('ws/socketconnection/', WSConsumer.as_asgi()),
]
