from django.db import models
from article_api.interfaces import ArticleMeta


class Article(ArticleMeta):
    class Meta(ArticleMeta.Meta):
        db_table = 'articles'
        ordering = ['-creation_date']

    def __str__(self):
        return self.title