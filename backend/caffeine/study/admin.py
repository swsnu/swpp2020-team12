from django.contrib import admin
from .models import DailyStudyRecord, DailyStudyForSubject, Concentration
# Register your models here.

admin.site.register(DailyStudyRecord)
admin.site.register(DailyStudyForSubject)
admin.site.register(Concentration)
