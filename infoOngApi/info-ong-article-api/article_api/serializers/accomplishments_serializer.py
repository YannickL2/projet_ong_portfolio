from rest_framework import serializers
from article_api.interfaces import ArticleSerializerMeta
from article_api.models import Accomplishement

class AccomplishementSerializer(ArticleSerializerMeta):
    location = serializers.CharField(max_length=128, default="location")

    class Meta:
        model = Accomplishement
        fields = [
            'title',
            'content',
            'isVisible',
            'creation_date',
            'modified_date',
            'visibleUntil',
            'image',
            'location'
        ]
        ordering = ['-creation_date']