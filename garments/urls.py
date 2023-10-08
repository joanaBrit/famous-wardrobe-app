from .views import GarmentListView, GarmentDetailView
from django.urls import path


# Path - /api/garments/
urlpatterns = [
    path('', GarmentListView.as_view()),
    path('<int:pk>/', GarmentDetailView.as_view())
]