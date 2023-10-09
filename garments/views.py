# Rest Framework
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly


# Model
from .models import Garment

# Serializer
from .serializers.common import GarmentSerializer


# Class views
# Get garments
class GarmentListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Garment.objects.all()
    serializer_class = GarmentSerializer
    
# Update, Delete garments
class GarmentDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Garment.objects.all()
    serializer_class = GarmentSerializer

