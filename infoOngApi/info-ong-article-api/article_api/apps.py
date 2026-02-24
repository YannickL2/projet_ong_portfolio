from django.apps import AppConfig


class ArticleApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'article_api'

    def ready(self):
        from article_api import handlers