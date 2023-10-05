from django.db import models


class Celebrity(models.Model):
    name = models.CharField(max_length=50)
    year = models.PositiveIntegerField()
    cover_image = models.ImageField()
    likes = models.PositiveIntegerField()


# STR juhlindA
    def __str__(self):
      return f"{self.name} - {self.year}"
