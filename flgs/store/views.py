from django.shortcuts import render
from .models import CategoryModel, ProductModel

# Create your views here.
def index(request):

    products = ProductModel.objects.all()

    for product in products:
        print(product.name, product.price, product.description, product.image.url, type(product.availability), '\n')
        if product.availability > 10:
            availability = 'In Stock'
        elif product.availability < 10:
            availability = "Number available: ", product.availability
        elif product.availability < 1:
            availability = "Out of stock"
    return render(request, 'store/index.html', {
        "products": products,
        "availability": availability,
    })


# Functions for Loading Product Page
def product_page(request, product):
    '''Return the product page'''
    
    categories = CategoryModel.objects.all()
    products = ProductModel.objects.all()
    
    # get_product_info(request, product)
    # for prod in products:
    #     print(prod.description)
    return render(request, 'store/product_page.html', {
        "product": get_product_info(request, product),
    })


def get_product_info(request, product):
    """Get the product information for a given product"""

    format_product = product.split('_')
    format_product = (" ").join(format_product)
    print(format_product)
    test = ProductModel.objects.filter(name=format_product)
  
    if request.method == 'GET':
        return ProductModel.objects.filter(name=format_product)[0]
        # try:
        #     product_details = ProductModel.objects.filter(name=format_product)
        #     print("PRODUCT DETAILS", product_details)
        # except:
        #     print("No product details found")


# Function/s for loading Category Page

def category_page(request, category):
    """When a category is clocked in the navbar, load and display items that match that
    category, clickable from all storefront pages (including product page)"""
    # current_category = CategoryModel.objects.get(category=category)

    products = ProductModel.objects.filter(categories__category=category) # __ mimics a SQL JOIN look up where the m2m 'categories' can be narrowed down to match a single 'category'

    # if len(products) == 0:
    #     return render(request, 'store/not_found.html')
    return render(request, 'store/categories/category.html', {
        "products": products
    })
    # try:
    #     products = ProductModel.objects.filter(categories__category=category) # __ mimics a SQL JOIN look up where the m2m 'categories' can be narrowed down to match a single 'category'
    #     print("Products", products)
    #     return render(request, 'store/categories/category.html', {
    #         'products': products 
    #     }
    #     )
    # except: 
    #     return render(request, 'store/not_found.html')

    return render(request, 'store/categories/category.html')


# Tests

def test(request, test):

    return render(request, 'store/test.html')