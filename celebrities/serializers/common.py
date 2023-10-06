from rest_framework import serializers
from ..models import Celebrity

# Custom Celebrity Serializer Class
# this will allow me to convert the data from db into python datatypes

class CelebritySerializer(serializers.ModelSerializer):
  class Meta:
    model = Celebrity
    fields = '__all__' 