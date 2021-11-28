from rest_framework import serializers
from .models import Reserva
from GestionMaterias.models import Dia,Hora,Horario
from GestionUsuarios.serializers import DocenteSerializer 

class ReservaSerializer(serializers.ModelSerializer):
  doc_dui = serializers.SlugRelatedField(
        many=False,
        read_only=True,
        slug_field='nombre'
    )
  class Meta:      
      model = Reserva
      depth = 2
      fields=['doc_dui','cod_reserva','cod_horario','cod_materia','cod_local','estado_solicitud']
            
class SimpleReservaSerializer(serializers.ModelSerializer):
      materia = serializers.CharField(source='cod_materia.nombre_materia', read_only=True) 
      # hora = serializers.PrimaryKeyRelatedField(source='cod_horario.cod_hora', read_only=True) 
      # dia = serializers.PrimaryKeyRelatedField(source='cod_horario.cod_dia', read_only=True) 
      
      
      class Meta:
                      
            model = Reserva
            depth = 1
            fields=['materia']
            
class SimpleHoraSerializer(serializers.ModelSerializer):
           
      class Meta:
            
            model = Hora
            depth = 1
            fields=['cod_hora']
        
class DiaSerializer(serializers.ModelSerializer):
      class Meta:
        model = Dia
        fields = ['cod_dia','nombre_dia']
        
class HoraSerializer(serializers.ModelSerializer):
      class Meta:
        model = Hora
        fields = ['cod_hora','hora_inicio','hora_fin']
        
