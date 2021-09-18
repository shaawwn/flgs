from django.contrib import admin
from .models import User, CategoryModel, ProductModel
# Register your models here.

admin.site.register(User)
admin.site.register(CategoryModel)
admin.site.register(ProductModel)