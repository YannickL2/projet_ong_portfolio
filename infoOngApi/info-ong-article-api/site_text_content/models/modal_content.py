from django.db import models
import datetime, uuid

class ModalText(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=64, unique=True, default="title")
    content = models.CharField(max_length=7500, default="content")
    creation_date = models.DateField(default=datetime.date.today())
    image = models.CharField(max_length=1000000, default="")

    class Meta:
        app_label = "site_text_content"
        db_table = 'modal_content'

    def __str__(self):
        return self.title