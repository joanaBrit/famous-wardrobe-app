from .views import CelebrityListView, CelebrityDetailView
from django.urls import path

urlpatterns = [
    path('', CelebrityListView.as_view()),
    path('<int:id>/', CelebrityDetailView.as_view())
]