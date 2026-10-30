from rest_framework.test import APITestCase


class VideoPermissionsTests(APITestCase):
    def test_upload_requires_login(self):
        response = self.client.post('/api/videos/upload/', {
            'title': 'Test video',
        }, format='multipart')
        self.assertEqual(response.status_code, 401)
