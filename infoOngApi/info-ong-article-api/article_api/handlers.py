from corsheaders.signals import check_request_enabled

from article_api.models.accomplishment_model import Accomplishement
from article_api.models.article_model import Article


def cors_allow_accomplishments(sender, request, **kwargs):
    return Accomplishement.objects.filter(host=request.headers["origin"]).exists()

def cors_allow_articles(sender, request, **kwargs):
    return Article.objects.filter(host=request.headers["origin"]).exists()


check_request_enabled.connect(cors_allow_accomplishments)
check_request_enabled.connect(cors_allow_articles)