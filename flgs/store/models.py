from django.db import models

# Create your models here.

# Category models
class CategoryModel(models.Model):
    """Product category for many-to-many relationship purposes"""
    category = models.CharField(max_length=100)

    class Meta:
        ordering = ['category']

    def __str__(self):
        return self.category


class ProductModel(models.Model):
    """Basic product details model"""
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=9, decimal_places=2)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to="images/")
    availability = models.IntegerField(default=0)
    categories = models.ManyToManyField(CategoryModel)

    def __str__(self):
        return self.name

