from django.db import models
from article_api.interfaces import ArticleMeta

class Accomplishement(ArticleMeta):
    location = models.CharField(max_length=128, default="location")
    
    class Meta(ArticleMeta.Meta):
        db_table = 'accomplishments'
        ordering = ['-creation_date']

    def __str__(self):
        return self.title