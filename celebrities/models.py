from django.db import models

# Model
class Celebrity(models.Model):
    name = models.CharField(max_length=100)
    year = models.PositiveIntegerField()
    cover_image = models.ImageField(blank=True, max_length=200)
    likes = models.PositiveIntegerField()


# STR 
    def __str__(self):
      return f"{self.name} - {self.year}"
