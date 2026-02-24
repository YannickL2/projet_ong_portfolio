from django.db import models
import datetime
import uuid

class ArticleMeta(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=64, unique=True, default="title")
    content = models.CharField(max_length=1024, default="content")
    isVisible = models.BooleanField(default = False)
    creation_date = models.DateField(default=datetime.date.today())
    modified_date = models.DateField(default=datetime.date.today())
    visibleUntil = models.DateField(default=datetime.date.today())
    image = models.CharField(max_length=1000000, default="")

    class Meta:
        app_label = "article_api"
        abstract = True
