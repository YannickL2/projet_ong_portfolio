from django.urls import include, path, re_path


from article_api.views import GetLastArticle, \
    GetArticleByTitle, \
    UpdateOrCreateArticle

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', view=GetLastArticle.as_view(), name="get_last_article"),
    path(r'search/<title>/', view=GetArticleByTitle.as_view(), name="an article by title"),
    path(r'manage/', view=UpdateOrCreateArticle.as_view(), name='create or update an article'),
]
