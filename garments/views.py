

# Model
from .models import Garment

# Serializer
from .serializers.common import GarmentSerializer

# Rest Framework
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

# Class views
# Get garments
class GarmentListView(ListCreateAPIView):
    queryset = Garment.objects.all()
    serializer_class = GarmentSerializer
# Update, Delete garments
class GarmentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Garment.objects.all()
    serializer_class = GarmentSerializer

