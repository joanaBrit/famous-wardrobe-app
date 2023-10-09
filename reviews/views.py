from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
# Model
from .models import Review

# Serializer
from .serializers.common import ReviewSerializer


# Class Views
# Get reviews
class ReviewListView(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# Update, Delete Reviews
class ReviewDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer