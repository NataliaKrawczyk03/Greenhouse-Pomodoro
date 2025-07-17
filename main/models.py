from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    account_balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    focus_time_min = models.IntegerField(default=25)
    focus_time_sec = models.IntegerField(default=0)
    short_break_min = models.IntegerField(default=5)
    short_break_sec = models.IntegerField(default=0)
    long_break_min = models.IntegerField(default=15)
    long_break_sec = models.IntegerField(default=0)
    

    def __str__(self):
        return f"{self.user.username} - Profile"