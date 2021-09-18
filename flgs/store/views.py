from django.contrib.auth import authenticate, login as auth_login, logout as auth_logout
from django.db import IntegrityError
from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from .models import User, CategoryModel, ProductModel

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
    return HttpResponseRedirect(reverse('store:index'))
    # return render(request, 'store/logout.html')


def register(request):
    """Registration page for new users"""

    if request.method=="POST":
        print("Registration working") # No password is being created
        username= request.POST['username']
        email = request.POST['username']
        password = request.POST['password']
        confirm = request.POST['confirm-password']

        if password != confirm:
            return render(request, 'store/register.html', {
                "message": "Passwords do not match."
            })

        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, 'store/register.html')
        # print("CREDS", email, password, confirm)
        # print(email, password)

        auth_login(request, user)
        return HttpResponseRedirect(reverse('store:index'))
    return render(request, 'store/register.html')

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


def error_page(request):
    """Returns an error Not Found page for broken links"""
    return render(request, 'store/not_found.html')



# Tests

# def test(request, test):

#     return render(request, 'store/test.html')