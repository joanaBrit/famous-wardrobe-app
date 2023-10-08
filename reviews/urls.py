from .views import ReviewListView, ReviewDetailView
from django.urls import path


# Path - /api/reviews/
urlpatterns = [
    path('', ReviewListView.as_view()),
    path('<int:pk>/', ReviewDetailView.as_view())
]