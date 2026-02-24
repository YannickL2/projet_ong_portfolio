from corsheaders.signals import check_request_enabled

from site_text_content.models import ModalText


def cors_allow_modal_content(sender, request, **kwargs):
    return ModalText.objects.filter(host=request.headers["origin"]).exists()

check_request_enabled.connect(cors_allow_modal_content)