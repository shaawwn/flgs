from django.urls import path
from . import views

app_name = 'store'
urlpatterns = [
    path("", views.index, name="index"),
    path("products/<str:product>", views.product_page, name="product_page"),
    path("categories/<str:category>", views.category_page, name="category_page"),

    # Account
    path("login", views.login, name="login"),
    path("logout", views.logout, name="logout"),
    path("register", views.register, name="register"),
    path("account/<str:user>", views.account_page, name="account_page"),

    # Product
    path("add_to_cart/<str:product>", views.add_to_cart, name="add_to_cart"),
    path("cart/<str:username>", views.cart, name="shopping_cart")


    # API routes
]
