from django.urls import include, path, re_path
from article_api.views import GetLastAccomplishment, \
                            GetAccomplishmentByTitle,  \
                            UpdateOrCreateAccomplishments


urlpatterns = [
    path('', view=GetLastAccomplishment.as_view(), name="get_last_accomplishment"),
    path(r'search/<str:title>/', view=GetAccomplishmentByTitle.as_view(), name="get_accomplishment_by_id"),
    path(r'manage/', view=UpdateOrCreateAccomplishments.as_view(), name="create or update an accomplishment")
]