from django.shortcuts import render
from .models import Post, ImageLink, CalendarEvent
import json
from datetime import datetime

now = datetime.now()
print(type(now), now.strftime("%-m/%d/%Y"))
# Create your views here.
def index(request):
    # Front page content, single page with home/calendar/contact info
    posts = Post.objects.all().order_by('-id')
    events = CalendarEvent.objects.all()

    events_dict = _event_to_json(events)
    print(events_dict)
    image_links = ImageLink.objects.all()
    return render(request, 'otherrealms/index.html', {
        "posts": posts,
        "image_links": image_links,
        "events": events_dict
    })


def _event_to_json(events):
    # Convert Django query set into something parseable by JSON
    events_dict = {}
    for event in events:
        events_dict[event.event_title] = []
        events_dict[event.event_title].append(event.event_content)
        events_dict[event.event_title].append(event.event_date.strftime('%Y/%m/%d'))
    return json.dumps(events_dict)


def addEvent(request):
    # Add an event object to the calendar
    # pass
    print('filler')

