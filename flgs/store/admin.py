from django.contrib import admin
from .models import User, CategoryModel, ProductModel, ShoppingCart, Order, CartItem
# Register your models here.

admin.site.register(User)
admin.site.register(CategoryModel)
admin.site.register(ProductModel)
admin.site.register(ShoppingCart)
admin.site.register(Order)
admin.site.register(CartItem)