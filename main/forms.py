from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm
from .models import UserProfile

class CustomUserCreationForm(UserCreationForm):
    first_name = forms.CharField(max_length=30, required=True, help_text='Required.')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'password1', 'password2')

class TimeSettingsForm(forms.ModelForm):
    class Meta:
        model = UserProfile
        fields = ['focus_time_min', 'focus_time_sec', 'short_break_min', 'short_break_sec', 'long_break_min', 'long_break_sec']
        widgets = {
            'focus_time_min': forms.NumberInput(attrs={'placeholder': 'Focus Time (min)', 'style': 'background-color: antiquewhite;'}),
            'focus_time_sec': forms.NumberInput(attrs={'placeholder': 'Focus Time (sec)', 'style': 'background-color: antiquewhite;'}),
            'short_break_min': forms.NumberInput(attrs={'placeholder': 'Short Break (min)', 'style': 'background-color: antiquewhite;'}),
            'short_break_sec': forms.NumberInput(attrs={'placeholder': 'Short Break (sec)', 'style': 'background-color: antiquewhite;'}),
            'long_break_min': forms.NumberInput(attrs={'placeholder': 'Long Break (min)', 'style': 'background-color: antiquewhite;'}),
            'long_break_sec': forms.NumberInput(attrs={'placeholder': 'Long Break (sec)', 'style': 'background-color: antiquewhite;'}),
        }

