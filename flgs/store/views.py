from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
import re
from .models import User, CategoryModel, ProductModel, ShoppingCart, Order, CartItem
import time

# Helpers

def check_valid_email(email):
    """Check if an entered email is a valid formatted email (example@example.com)"""
    email_re = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

    if re.fullmatch(email_re, email):
        return True
    else:
        return False


# Create your views here.
def index(request):
    
    products = ProductModel.objects.all()
    
    # for product in products:
    #     print(product.name, product.price, product.description, product.image.url, type(product.availability), '\n')
    #     if product.availability > 10:
    #         availability = 'In Stock'
    #     elif product.availability < 10:
    #         availability = "Number available: ", product.availability
    #     elif product.availability < 1:
    #         availability = "Out of stock"

    # Debugign values
    availability = ""


    return render(request, 'store/index.html', {
        "products": products,
        "availability": availability,
    })


def login(request):
    """Login page for registered users"""
    if request.method == 'POST':
        # Log user in if user exists
        username = request.POST['username']
        password = request.POST['password']
        print("USER DEETS", username, password)
        user = authenticate(request, username=username, password=password)
        print("USER", user)
        if user is not None:
            print("Logging in...")
            auth_login(request, user)
            return HttpResponseRedirect(reverse('store:index'))
        else:
            print("Not logging in...")
            return render(request, 'store/login.html', {
                "message": "Invalid username and/or password"
            })

        # If user doesn't exist, redirect to 'User does not exist' page, with a link to registration page
    return render(request, 'store/login.html')


def logout(request):
    """Confirm logout page"""
    auth_logout(request)
    # return HttpResponseRedirect(reverse('store:index'))
    return render(request, 'store/logout.html')


def register(request):
    """Registration page for new users"""

    if request.method=="POST":
        print("Registration working") # No password is being created
        # username= request.POST['username']
        email = request.POST['username']
        password = request.POST['password']
        confirm = request.POST['confirm-password']

        if not check_valid_email(email):
            return render(request, 'store/register.html', {
                "message": "Please enter a valid email address"
            })
        if password != confirm:
            return render(request, 'store/register.html', {
                "message": "Passwords do not match."
            })

        try:
            # Check for existing email
            user = User.objects.create_user(email, email, password)
            user.save()
        except IntegrityError:
            error = 'An account with this email already exists.'
            return render(request, 'store/register.html', {
                'message': error
            })
        # print("CREDS", email, password, confirm)
        # print(email, password)

        auth_login(request, user)
        return HttpResponseRedirect(reverse('store:index'))
    return render(request, 'store/register.html')

# ------------------------------- USER ACCOUNT VIEWS -------
def account_page(request, user):
    """User account page"""

    current_order = True
    return render(request, 'store/account.html', {
        "current_order": current_order,
    })


def load_current_order(request):
    '''
    If customer has outstanding orders, load them here
    '''
    pass

def load_recent_orders(request):
    '''
    Load recent orders (maybe selectable by time frame, ie 'In last 6 months')
    '''
    pass

# -----------------------------PRODUCT VIEWS ---------------
# Functions for Loading Product Page
def product_page(request, product):
    '''Return the product page'''
    
    categories = CategoryModel.objects.all()
    products = ProductModel.objects.all()
    
    try:
        return render(request, 'store/product_page.html', {
            "product": get_product_info(request, product),
        })
    except:
        return render(request, 'store/not_found.html')


def get_product_info(request, product):
    """Get the product information for a given product"""

    format_product = product.split('_')
    format_product = (" ").join(format_product)
    print(format_product)
    test = ProductModel.objects.filter(name=format_product)
  
    if request.method == 'GET':
        return ProductModel.objects.filter(name=format_product)[0]


def category_page(request, category):
    """When a category is clocked in the navbar, load and display items that match that
    category, clickable from all storefront pages (including product page)"""

    products = ProductModel.objects.filter(categories__category=category) # __ mimics a SQL JOIN look up where the m2m 'categories' can be narrowed down to match a single 'category'

    return render(request, 'store/category.html', {
        "products": products
    })

    return render(request, 'store/category.html')


def add_to_cart(request, product):
    '''Add a product to a user's shopping car
    shopping_cart.cart_items == Order object
    '''


    if request.method == 'POST':
        product_obj = ProductModel.objects.get(name=product)
        user = User.objects.get(username=request.user)
        try:
            # If the cart exists, create variables to use
            shopping_cart = ShoppingCart.objects.get(user=user)
            shopping_cart.save()
        except:
            # If cart doesn't exist, initialize
            shopping_cart = ShoppingCart(user=user)
            shopping_cart.save()
        
        if product_obj in [x.item for x in shopping_cart.cart_items.all()]:
            # Update the quantity of the item instead of creating a new item
            cart_item = shopping_cart.cart_items.get(item=product_obj)
            cart_item.quantity += 1
            cart_item.save()
            return HttpResponseRedirect(reverse('store:product_page', args=[product]))
        # else:
        #     print("Not in cart", product_obj, [x.item for x in shopping_cart.cart_items.all()])
        add_item = CartItem(quantity=1, item=product_obj)
        add_item.save()
        shopping_cart.cart_items.add(add_item)
        shopping_cart.save()
        for item in shopping_cart.cart_items.all():
            print(item.item)
    return HttpResponseRedirect(reverse('store:product_page', args=[product]))


def cart(request, username):
    """Load user's shopping cart, if any"""
    user = User.objects.get(username=username)
    try:
        shopping_cart = ShoppingCart.objects.get(user=user)

    except:
        message = 'There are no items in the shopping cart.'
        return render(request, 'store/cart.html', {
            "message": message
        })

    cart = shopping_cart.cart_items.all()
    total_price = 0
    total_items = 0
    for prod in shopping_cart.cart_items.all():
        # print(prod.item.price, prod.quantity)
        total_price += prod.item.price * prod.quantity
        total_items += prod.quantity
    return render(request, 'store/cart.html', {
        "cart": cart,
        "total_price": total_price,
        "total_items": total_items,
    })


def checkout(request):
    """Checkout page where users can confirm shipping/billing and confirm purchases"""
    order = ShoppingCart.objects.get(user=request.user)
    order_iterable = order.cart_items.all()
    for item in order.cart_items.all():
        print(item.item.name)

    # Once a user confirms their order, create an order instance using the shopping cart
    return render(request, 'store/checkout.html', {
        "order": order_iterable,
    })


def error_page(request):
    """Returns an error Not Found page for broken links"""
    return render(request, 'store/not_found.html')



# Helpers

# Tests

# def test(request, test):

#     return render(request, 'store/test.html')