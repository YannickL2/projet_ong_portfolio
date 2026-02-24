from rest_framework import serializers
from article_api.models import Article

class ArticleSerializer(serializers.ModelSerializer):
    title = serializers.CharField(max_length=64)
    content = serializers.CharField(max_length=1024)
    isVisible = serializers.BooleanField(default=False)
    creation_date = serializers.DateField()
    modified_date = serializers.DateField()
    visibleUntil = serializers.DateField()
    image = serializers.CharField(max_length=1000000)

    class Meta:
        model = Article
        fields = [
            'title',
            'content',
            'isVisible',
            'creation_date',
            'modified_date',
            'visibleUntil',
            'image'
        ]
        ordering = ['-creation_date']
