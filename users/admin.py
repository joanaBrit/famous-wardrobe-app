from django.contrib import admin
from django.contrib.auth import get_user_model


# Save it as a User 
User = get_user_model()

admin.site.register(User)
