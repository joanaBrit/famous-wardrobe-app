from django.db import models


# Model
class Garment(models.Model):
    title = models.CharField(max_length=100)
    brand = models.CharField(max_length=50)
    price = models.PositiveIntegerField()
    garments = models.ImageField(blank=True, max_length=200)
    celebrity = models.ForeignKey(
        'celebrities.Celebrity',
        related_name='garments',
        on_delete=models.CASCADE,
        db_column="celebrity"
    )


# STR
    def __str__(self):
        return self.title
