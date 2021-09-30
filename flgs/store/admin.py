from django.contrib import admin
from .models import User, UserAccount, Billing, Address, CategoryModel, ProductModel, ShoppingCart, Order, CartItem
# Register your models here.

# User models
admin.site.register(User)
admin.site.register(UserAccount)
admin.site.register(Billing)
admin.site.register(Address)

# Order/Cart Models
admin.site.register(ShoppingCart)
admin.site.register(CartItem)
admin.site.register(Order)

# Product Models
admin.site.register(CategoryModel)
admin.site.register(ProductModel)
