from rest_framework import serializers

class ArticleSerializerMeta(serializers.ModelSerializer):
    title = serializers.CharField(max_length=64)
    content = serializers.CharField(max_length=1024)
    isVisible = serializers.BooleanField(default=False)
    creation_date = serializers.DateField()
    modified_date = serializers.DateField()
    visibleUntil = serializers.DateField()
    image = serializers.CharField(max_length=10000000)
