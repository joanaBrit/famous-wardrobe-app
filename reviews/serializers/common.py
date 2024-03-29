from rest_framework import serializers
from ..models import Review


# Custom Garment Serializer Class
class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = '__all__'