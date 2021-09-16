from django.urls import path
from . import views

app_name = 'store'
urlpatterns = [
    path("", views.index, name="index"),
    path("<str:product>", views.product_page, name="product_page"),
    path("categories/<str:category>", views.category_page, name="category_page"),
    path("test/<str:test>", views.test, name="test"),
    # API routes
]
