
# from rest_framework.generics import (
#     RetrieveUpdateDestroyAPIView, 
#     UpdateAPIView, 
#     GenericAPIView
# )
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound

from .models import Celebrity

from .serializers.common import CelebritySerializer

# EndPoint for view: /celebrities
class CelebrityListView(APIView):
    def get(self, request):
      celebrities = Celebrity.objects.all()
      serialized_celebrities = CelebritySerializer(celebrities, many=True)
      return Response(serialized_celebrities.data)
# class CelebrityListView(GenericAPIView):
#     # 1 - Query the database to get all celebrities
#     celebrities = Celebrity.objects.all()
#     # 2 - We need to convert the data into python data type
#     serialized_celebrities = CelebritySerializer(celebrities, many=True)
    
  
    def post(Self, request):
      try:
  
          celebrity_to_add = CelebritySerializer(data=request.data)
          if celebrity_to_add.is_valid():
              print(celebrity_to_add.validated_data)
              celebrity_to_add.save()
              return Response (celebrity_to_add.data, status.HTTP_201_CREATED)
          print(celebrity_to_add.errors)
          return Response(celebrity_to_add.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
      except Exception as e :
          print('exception ->', e)
          return Response({ 'detail': str(e) }, status.HTTP_500_INTERNAL_SERVER_ERROR)
      
# EndPoint for view: /celebritie/pk      
class CelebrityDetailView(APIView):
    def get_celebrity(self, id):
      try:
          return Celebrity.objects.get(pk=id)
        # print(designer)
      except Celebrity.DoesNotExist as e:
          raise NotFound(str(e))
      
    # The url param
    def get(self, request, id):
      try:
          celebrity = self.get_celebrity(id)
          serialized_celebrity = CelebritySerializer(celebrity)
          return Response(serialized_celebrity.data) # you don't need to do like in the documentation data={} because this is the 2 param
      except Exception as e:
          print('Exception', e)
          return Response({ 'error': str(e) }, status.HTTP_500_INTERNAL_SERVER_ERROR)
      
    # Update
    def put(self, request, id):
          celebrity = self.get_celebrity(id)
          serialized_celebrity = CelebritySerializer(celebrity, request.data, partial=True)
          if serialized_celebrity.is_valid():
              serialized_celebrity.save()
              return Response (serialized_celebrity.data, status.HTTP_200_OK)
          return Response(serialized_celebrity.errors, status.HTTP_422_UNPROCESSABLE_ENTITY)
    
    # Delete
    def delete(self, request, id):
        celebrity_to_delete = self.get_celebrity(id)
        celebrity_to_delete.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
      