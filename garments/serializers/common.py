from rest_framework import serializers
from ..models import Garment

# Custom Celebrity Serializer Class
# this will allow us to convert the date from db into python datatypes

class GarmentSerializer(serializers.ModelSerializer):
  class Meta:
    model = Garment
    fields = '__all__' 