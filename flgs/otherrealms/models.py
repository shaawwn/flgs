from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class User(AbstractUser):
    pass

class Post(models.Model):
    # Post model for admin front page posts
    # poster = models.ForeignKey('User', default=None, on_delete=models.CASCADE)
    post_title = models.CharField(max_length=255)
    post_content = models.TextField(blank=True)
    post_image = models.ImageField(null=True, blank=True, upload_to="images/")

    def __str__(self):
        return self.post_title

class ImageLink(models.Model):
    # Class for image links on the right side of the front page
    img_alt = models.CharField(max_length=255)
    img_link = models.CharField(max_length=255)
    img = models.ImageField(null=True, blank=True, upload_to="images/")

    def __str__(self):
        return self.img_alt

class CalendarEvent(models.Model):
    # Mini-posts to be added to the calendar
    event_title = models.CharField(max_length=64)
    event_date = models.DateField(auto_now=False, auto_now_add=False)
    event_content = models.TextField(blank=True)
    event_image = models.ImageField(null=True, blank=True, upload_to="images/")

    def serialize(self):
        return {
            'id': self.id,
            'title': self.event_title,
            'date': self.event_date,
            'content': self.event_content,
            'image': str(self.event_image) # Images can't be serializd, so convert path to str
        }


    def __str__(self):
        return self.event_title

