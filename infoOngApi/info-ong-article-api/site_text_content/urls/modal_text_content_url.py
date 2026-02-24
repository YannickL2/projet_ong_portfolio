from django.urls import path
from site_text_content.views import GetModalTextContentByTitle


urlpatterns = [
    path(r'search/<str:title>', view=GetModalTextContentByTitle.as_view(), name="get_text_content_by_title")
]