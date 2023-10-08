from .views import CelebrityListView, CelebrityDetailView
from django.urls import path


# Path - /api/celebrities/
urlpatterns = [
    path('', CelebrityListView.as_view()),
    path('<int:pk>/', CelebrityDetailView.as_view())
]