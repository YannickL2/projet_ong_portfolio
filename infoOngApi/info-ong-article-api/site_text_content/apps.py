from django.apps import AppConfig


class SiteTextContentConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'site_text_content'

    def ready(self):
        from site_text_content import handlers