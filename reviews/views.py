from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView,
    UpdateAPIView,
    GenericAPIView
    )

# View lib
from lib.views import UserListCreateAPIView

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from lib.permission import IsOwnerOrReadOnly

# Model
from .models import Review

# Serializer
from .serializers.common import ReviewSerializer

# Rest Framework
from rest_framework.response import Response


# Generic
class ReviewView(GenericAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


# Class Views
# Get reviews
class ReviewListView(ReviewView, UserListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]

# Update, Delete Reviews
class ReviewDetailView(ReviewView, RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]

# Likes
class ReviewLikeView(ReviewView, UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **Kwargs):
        # Get review
        review = self.get_object()

        # Check if the user already appears on list, remove it if yes
        if request.user in review.likes.all():
            review.likes.remove(request.user)
            review.save()
            return Response(status=204)
        # If user does not exist in likes add them
        else:
            review.likes.add(request.user)
            review.save()
            return Response(status=201)