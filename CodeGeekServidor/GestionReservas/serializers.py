from rest_framework import serializers
from .models import Reserva
from GestionMaterias.models import Dia,Hora,Horario

class ReservaSerializer(serializers.ModelSerializer):
      class Meta:
            model = Reserva
            depth = 2
            #   fields='__all__'
            fields=['cod_horario','cod_materia','estado_solicitud']
        
class DiaSerializer(serializers.ModelSerializer):
      class Meta:
        model = Dia
        fields = ['cod_dia','nombre_dia']
        
class HoraSerializer(serializers.ModelSerializer):
      class Meta:
        model = Hora
        fields = ['cod_hora','hora_inicio','hora_fin']
        