from django.db import models

# Model
class Garment(models.Model):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    garments = models.ImageField(blank=True)
    


# STR 
    def __str__(self):
      return self.title