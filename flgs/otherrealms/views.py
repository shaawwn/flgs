from django.shortcuts import render
from .models import Post, ImageLink

# Create your views here.
def index(request):
    posts = Post.objects.all().order_by('-id')
    image_links = ImageLink.objects.all()
    return render(request, 'otherrealms/index.html', {
        "posts": posts,
        "image_links": image_links,
    })

