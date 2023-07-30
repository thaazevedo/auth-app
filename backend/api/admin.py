from django.contrib import admin
from .models import User


class UserAdmin(admin.ModelAdmin):
    model = User
    list_display = ['id', 'email', 'password']

admin.site.register(User, UserAdmin)
