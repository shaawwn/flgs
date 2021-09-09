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
