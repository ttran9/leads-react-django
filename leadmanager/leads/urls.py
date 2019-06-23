from .api import LeadViewSet
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r'api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls
