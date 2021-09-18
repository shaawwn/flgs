from django.contrib.auth.models import AbstractUser
from django.db import models

# Globals
CARD_NAMES = (
    "American Express",
    "VISA",
    "Discovery",
    "MasterCard"
)
# Create your models here.

class User(AbstractUser):
    """Inherit from Abstract User"""
    # shopping_cart
    # order_history
    # billing_information
    # shipping_information
    pass
    

class Address(models.Model):
    """Address model to be used with billing/shipping"""
    street1 = models.CharField(max_length=64)
    street2 = models.CharField(max_length=64, blank=True)
    city = models.CharField(max_length=64)
    state = models.CharField(max_length=2)
    zip = models.CharField(max_length=10)

class Billing(models.Model):
    """Model to hold a users card and billing information"""
    AMEX = "American Express"
    VISA = "Visa"
    DISCOVER = "Discover"
    MASTERCARD = "Mastercard"
    card_name = models.CharField(max_length=24, choices=[
        (AMEX, "American Express"),
        (VISA, "Visa"),
        (DISCOVER, "Discover"),
        (MASTERCARD, "Mastercard"),
    ])
    card_number = models.CharField(max_length=20)
    billing_address = models.OneToOneField(Address, on_delete=models.CASCADE)


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


# Order/Wishlist User related models

class Order(models.Model):
    """Model for holding a user's order information, can be archived by setting completed=True
    Can be used for a User's Shopping Cart?
    """
    # order_user
    # order_number
    # order_products
    # order_price
    # order_num_items

    pass

class ShoppingCart(models.Model):
    """User shopping cart, potentiallyi inherits from Order"""
    pass

class WishList(models.Model):
    """A user's wishlist"""
    # user
    # products
    
    pass


# User Account Models


class UserAccount(models.Model):
    """Inherits from User"""
    # user_information (inherits from User)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    shopping_cart = models.OneToOneField(ShoppingCart, on_delete=models.CASCADE)
    # order_history (order history is an array of previous orders made by the user)
    billing_information = models.ForeignKey(Billing, on_delete=models.CASCADE) # 
    shipping_information = models.ManyToManyField(Address) # Because a user could have multiple shipping addresses

    def __str__(self):
        return self.user
