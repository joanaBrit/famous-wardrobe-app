
from rest_framework.generics import (
    RetrieveUpdateDestroyAPIView, 
    ListCreateAPIView,
    UpdateAPIView,
    GenericAPIView
)

# Permissions
from rest_framework.permissions import IsAuthenticated, IsAuthenticatedOrReadOnly
from lib.permission import IsOwnerOrReadOnly

# Model
from .models import Celebrity

# Serializers
from .serializers.common import CelebritySerializer
from .serializers.populated import PopulatedCelebritySerializer

# Rest Framework
from rest_framework.response import Response


# Generic
class CelebrityView(GenericAPIView):
    queryset = Celebrity.objects.all()
    serializer_class = CelebritySerializer


# Class Views
# Get celebrities
class CelebrityListView(CelebrityView, ListCreateAPIView):
    permission_classes = [IsAuthenticatedOrReadOnly]
    
# Detail view Celebrities
class CelebrityDetailView(CelebrityView, RetrieveUpdateDestroyAPIView):
    serializer_class = PopulatedCelebritySerializer
    permission_classes = [IsAuthenticated]

# Likes
# EndPoint /books/:id/like
class CelebrityLikeView(CelebrityView, UpdateAPIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **Kwargs):
        # Get celebrity
        celebrity = self.get_object()

        # Check if the user already appears on list, remove it if yes
        if request.user in celebrity.likes.all():
            celebrity.likes.remove(request.user)
            celebrity.save()
            return Response(status=204)
        # If user does not exist in likes add them
        else:
            celebrity.likes.add(request.user)
            celebrity.save()
            return Response(status=201)


