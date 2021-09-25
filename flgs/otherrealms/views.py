from django.shortcuts import render
from .models import Post, ImageLink, CalendarEvent
import json
from datetime import datetime
# from django.core import serializers
from django.http import JsonResponse

now = datetime.now()
# print(type(now), now.strftime("%-m/%d/%Y"))

# Create your views here.
def index(request):
    # Front page content, single page with home/calendar/contact info
    posts = Post.objects.all().order_by('-id')
    events = CalendarEvent.objects.all()

    events_dict = _event_to_json(events)
    # print(events_dict)
    image_links = ImageLink.objects.all()
    return render(request, 'otherrealms/index.html', {
        "posts": posts,
        "image_links": image_links,
        "events": events_dict
    })


def _event_to_json(events):
    # Convert Django query set into something parseable by JSON
    # Make the dates the keys
    events_dict = {}
    for event in events:
        
        # Windows
        # key = event.event_date.strftime('%#m/%#d/%Y')

        # Mac
        key = event.event_date.strftime('%-m/%-d/%Y')

        events_dict[key] = []
        events_dict[key].append(event.event_title)
        events_dict[key].append(event.event_content)


        # events_dict[key].append(event.event_image.url)
        print("EVENT IMAGE", event)
        try:
            events_dict[key].append(event.event_image.url)
        except ValueError:
            print("No image associated with post")
            events_dict[key].append(None)
            continue
    return json.dumps(events_dict)


def addEvent(request):
    # Add an event object to the calendar
    # pass
    print('filler')

def get_event(request, date):
    # Retrieve the event details for a given date
    print("Getting event with serializer imported")

    date = date.replace('_', '/', 2)

    if request.method == 'GET':
        print(f"Date in conditional {date}")
        _event_date = datetime.strptime(date, '%m/%d/%Y')

        event_details = CalendarEvent.objects.filter(
            event_date = _event_date.date()
            # event_date = date
        )

        for event in event_details:

            print("Event: ", type(event), event.serialize())
        print("Python loading event", event_details)
        return JsonResponse(([event.serialize() for event in event_details]), safe=False)

# TEST_PRODUCTS = [
#     'dnd': {
#         'name': 'Dungeons and Dragons Start Set',
#         'price': '19.99',
#         'description': 'Get started with this cheap and easy to user DND Starter set, DM guide and rulebook included!',
#         'image': 'image url',
#         'availability': 0,
#         'category': ['tabletop', 'roleplaying', 'rulebook']
#     }
#     ]

# dictionary_list = [
#     {'test': {
#         '1': 1,
#         '2': 2,
#         '3': 3
#     }},
#     {'test2': {
#         '1':1
#     }},
# ]

def add_products(product_list):
    """Add products to the store automatically with a product list instead of manually via admin page
    Product list is a list of products as dictionaries such as 'product': [name, description, image, etc]
    """

    # Product.objects.create()
    # Product.save()
    pass

# class ProductModel(models.Model):
#     """Basic product details model"""
#     name = models.CharField(max_length=100)
#     price = models.DecimalField(max_digits=9, decimal_places=2)
#     description = models.TextField(blank=True)
#     image = models.ImageField(upload_to="images/")
#     availability = models.IntegerField(default=0)
#     categories = models.ManyToManyField(CategoryModel)

#     def __str__(self):
#         return self.name