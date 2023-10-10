from django.db import models

# Model
class Celebrity(models.Model):
    name = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    cover_image = models.ImageField(max_length=200)
    likes = models.ManyToManyField(
        'users.User',
        related_name='liked_celebrities',
        blank=True
    )
    


# STR 
    def __str__(self):
      return f"{self.name} - {self.year}"
