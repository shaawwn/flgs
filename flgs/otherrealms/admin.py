from django.contrib import admin
from .models import Post, ImageLink, CalendarEvent
# Register your models here.
# admin.site.register(User)
admin.site.register(Post)
admin.site.register(ImageLink)
admin.site.register(CalendarEvent)