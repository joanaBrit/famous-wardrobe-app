from django.db import models

# Create your models here.
class Review(models.Model):
    text = models.TextField(max_length=350)
    date = models.DateField(auto_now=True)
    likes = models.PositiveIntegerField()
    celebrity = models.ForeignKey(
        'celebrities.Celebrity',
        related_name='reviews',
        on_delete=models.CASCADE
    )




# STR 
    def __str__(self):
      return f"{self.text} - ({self.date})"