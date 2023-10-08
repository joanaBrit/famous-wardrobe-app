from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView

# Model
from .models import Review

# Serializer
from .serializers.common import ReviewSerializer


# Class Views
# Get reviews
class ReviewListView(ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer

# Update, Delete Reviews
class ReviewDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer