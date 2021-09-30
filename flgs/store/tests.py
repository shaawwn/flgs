from django.test import TestCase, Client
from store.models import ProductModel

from selenium import webdriver
# Create your tests here.

class Tests(TestCase):

    def test_index(self):
        """Testing index page"""
        c = Client()
        response = c.get('')
        self.assertEqual(response.status_code, 200)

    def test_storefront(self):
        """Testing storefront page"""
        c = Client()
        response = c.get('/store/')
        self.assertEqual(response.status_code, 200)

    def test_category(self):
        """Testing that a category page works"""
        c = Client()
        response = c.get('/store/categories/wargaming')
        self.assertEqual(response.status_code, 200)

    def test_userpage(self):
        """Testing that a user page loads"""
        c = Client()
        response = c.get('/store/account/admin')
        self.assertEqual(response.status_code, 200)

    def test_product_page(self):
        """Testing that product_page loads"""
        c = Client()
        test_item = "DND Starter Set"
        response = c.get(f'/store/products/{test_item}')
        print(response.context['request'])
        self.assertEqual(response.status_code, 200)
        # self.assertEqual(response.context["product"], ProductModel.objects.get(name="DND Starter Set"))

    def test_edit_button(self):
        """Test that the edit button is changing from edit/change in user account page"""
        # Admin creds: username=admin, password = owooo#53
        c = Client()
        c.get(f'/store/account/{user}')
        # edit_btn = page.find_element_by_class_name('account-edit-btn')

