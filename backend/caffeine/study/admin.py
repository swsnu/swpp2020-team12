from django.contrib import admin
from .models import Daily_study_record, Daily_study_for_subject, Concentration
# Register your models here.

admin.site.register(Daily_study_record)
admin.site.register(Daily_study_for_subject)
admin.site.register(Concentration)