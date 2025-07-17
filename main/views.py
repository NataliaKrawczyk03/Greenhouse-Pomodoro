from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.forms import UserCreationForm
from django.contrib import messages
from .forms import CustomUserCreationForm, TimeSettingsForm
from .models import UserProfile
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required


#timer page
def timer(request):
    if not request.user.is_authenticated:
        return HttpResponseRedirect(reverse("login"))
    try:
        user_profile = UserProfile.objects.get(user=request.user)
        account_balance = user_profile.account_balance
        focus_time = user_profile.focus_time_min
        short_break = user_profile.short_break_min
        long_break = user_profile.long_break_min
    except UserProfile.DoesNotExist:
        account_balance = 0.00

         # Jeśli dane zostały przesłane (np. użytkownik wprowadził nowe czasy)
    if request.method == 'POST':
        form = TimeSettingsForm(request.POST, instance=user_profile)

        # Sprawdź, czy formularz jest poprawny
        if form.is_valid():
            form.save()  # Zapisz nowe ustawienia w bazie danych
            return redirect('timer')  # Przekierowanie po udanym zapisie, aby zapobiec ponownemu wysłaniu formularza

    else:
        # Jeśli żądanie to GET, pokaż formularz z aktualnymi wartościami
        form = TimeSettingsForm(instance=user_profile)

    # Przygotowanie kontekstu
    context = {
        'form': form,
        'account_balance': user_profile.account_balance,
        'focus_time_min': user_profile.focus_time_min,
        'focus_time_sec': user_profile.focus_time_sec,
        'short_break_min': user_profile.short_break_min,
        'short_break_sec': user_profile.short_break_sec,
        'long_break_min': user_profile.long_break_min,
        'long_break_sec': user_profile.long_break_sec,
    }

    return render(request, "interface/main.html", context)

#login view
def login_view(request):
    if request.method == "POST":
        
        username = request.POST["username"]
        password = request.POST["password"]

        user = authenticate(request, username=username, password=password)
        
        if user is not None:
            login(request,user)
            return HttpResponseRedirect(reverse("timer"))
        
        else:
            return render(request, "users/login.html", {
                "message": "Invalid Credentials"
            })

    return render(request, "users/login.html")

#logout view
def logout_view(request):
    logout(request)
    return render(request, "users/login.html",)

#signup
def signup(request):

    if request.method == "POST":
        form = CustomUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data['username']
            password = form.cleaned_data['password1']
            user = authenticate(username=username, password=password)
            login(request, user)
            messages.success(request,("Registration successful"))
            return HttpResponseRedirect(reverse("timer"))
    else:
        form = CustomUserCreationForm()
    return render(request, "users/signup.html", {
        'form':form,
    })

