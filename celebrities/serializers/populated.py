from .common import CelebritySerializer
from reviews.serializers.common import ReviewSerializer
from garments.serializers.common import GarmentSerializer


class PopulatedCelebritySerializer(CelebritySerializer):
  reviews = ReviewSerializer(many=True)
  garments = GarmentSerializer(many=True)