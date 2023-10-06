from django.db import models

# Model
class Garment(models.Model):
    title = models.CharField(max_length=200)
    brand = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    garments = models.ImageField(blank=True, max_length=200)
    


# STR 
    def __str__(self):
      return self.title