from rest_framework.generics import (
  ListCreateAPIView,
  GenericAPIView,
  RetrieveUpdateDestroyAPIView)

# Permissions
from rest_framework.permissions import IsAuthenticated

# Model
from .models import Garment

# Serializer
from .serializers.common import GarmentSerializer


# Generic
class GarmentView(GenericAPIView):
    queryset = Garment.objects.all()
    serializer_class = GarmentSerializer


# Class views
# Get garments
class GarmentListView(GarmentView, ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    
    
# Update, Delete garments
class GarmentDetailView(GarmentView, RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    

