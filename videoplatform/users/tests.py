from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase


class RegistrationTests(APITestCase):
    def test_registers_user_with_hashed_password(self):
        response = self.client.post('/api/users/register/', {
            'email': 'student@example.com',
            'username': 'student',
            'password': 'LongPassword2026!',
        }, format='json')

        self.assertEqual(response.status_code, 201)
        user = get_user_model().objects.get(email='student@example.com')
        self.assertTrue(user.check_password('LongPassword2026!'))

    def test_rejects_weak_password(self):
        response = self.client.post('/api/users/register/', {
            'email': 'student@example.com',
            'username': 'student',
            'password': '123',
        }, format='json')

        self.assertEqual(response.status_code, 400)
        self.assertIn('password', response.data)
