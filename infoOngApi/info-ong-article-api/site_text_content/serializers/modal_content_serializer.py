from rest_framework import serializers
from site_text_content.models import ModalText

class ModalContentSerializer(serializers.ModelSerializer):

    class Meta:
        model = ModalText
        fields = [
            'title',
            'content',
            'creation_date',
            'image'
        ]