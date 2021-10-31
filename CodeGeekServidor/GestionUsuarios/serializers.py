from rest_framework import serializers

from GestionUsuarios.models import Docente

class DocenteSerializer(serializers.ModelSerializer):
      class Meta:
            
            model = Docente
            fields=['nombre']
        