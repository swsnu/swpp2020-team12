from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth import get_user_model

# Register your models here.

User = get_user_model()


class MyUserAdmin(UserAdmin):
    model = User
    list_display = ['username', 'name', 'message']

    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('name', 'message')}),
    )


admin.site.register(User, MyUserAdmin)
