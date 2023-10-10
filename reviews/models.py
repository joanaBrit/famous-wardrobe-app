from django.db import models

# Create your models here.
class Review(models.Model):
    text = models.TextField(max_length=350)
    date = models.DateField(auto_now=True)
    likes = models.ManyToManyField(
        'users.User',
        related_name='liked_reviews',
        blank=True
    )
    celebrity = models.ForeignKey(
        'celebrities.Celebrity',
        related_name='reviews',
        on_delete=models.CASCADE
    )
    user = models.ForeignKey(
        'users.User',
        related_name='reviews',
        on_delete=models.CASCADE,
        null=True
    )




# STR 
    def __str__(self):
      return f"{self.text} - ({self.date})"