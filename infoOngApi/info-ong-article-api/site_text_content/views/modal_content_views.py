from django.contrib.auth.models import User
from django.http import JsonResponse, \
                        HttpResponse, \
                        HttpResponseForbidden, \
                        HttpResponseNotAllowed, \
                        Http404, \
                        HttpResponseNotFound

from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from site_text_content.models import ModalText
from site_text_content.serializers import ModalContentSerializer


class ModalTextContentListViews(viewsets.ModelViewSet):
    queryset = ModalText.objects.all()
    serializer_class = ModalContentSerializer

    def list(self, request):
        if request.method == "GET":
            queryset = self.get_queryset()
            if queryset is not None and len(queryset) > 0:
                serializer = ModalContentSerializer(queryset, many=True)
                return JsonResponse(serializer.data, safe=False)
            return HttpResponse(['No Text Found'])
        else:
            return HttpResponseNotAllowed
        
    
class GetModalTextContentByTitle(generics.GenericAPIView):
    model = ModalText
    queryset = ModalText.objects.all()
    serializer_class = ModalContentSerializer

    def get(self, request, title=None):
        if request.method != "GET":
            return HttpResponseNotAllowed
        
        if title is not None:
            queryset = self.queryset.filter(title=title).values().first()

            if queryset is not None and len(queryset) > 0:
                serializer = ModalContentSerializer(queryset, many=False)
                return JsonResponse(serializer.data)
            return HttpResponse({'not found'})