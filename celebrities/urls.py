from .views import CelebrityListView, CelebrityDetailView, CelebrityLikeView
from django.urls import path


# Path - /api/celebrities/
urlpatterns = [
    path('', CelebrityListView.as_view()),
    path('<int:pk>/', CelebrityDetailView.as_view()),
    path('<int:pk>/like/', CelebrityLikeView.as_view())
]