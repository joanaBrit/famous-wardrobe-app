from django.db import models

# Model
class Celebrity(models.Model):
    name = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    cover_image = models.ImageField(blank=True)
    likes = models.PositiveIntegerField()


# STR 
    def __str__(self):
      return f"{self.name} - {self.year}"
