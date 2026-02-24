from django.contrib.auth.models import User
from django.http import JsonResponse, \
                        HttpResponse, \
                        HttpResponseForbidden, \
                        HttpResponseNotAllowed, \
                        Http404, \
                        HttpResponseNotFound
from article_api.serializers import AccomplishementSerializer
from article_api.models.accomplishment_model import Accomplishement
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
import json


class AccomplishmentListViews(viewsets.ModelViewSet):
    queryset = Accomplishement.objects.all().order_by('-creation_date')
    serializer_class = AccomplishementSerializer

    def list(self, request):
        if request.method == "GET":
            queryset = self.get_queryset()
            if queryset is not None and len(queryset) > 0:
                serializer = AccomplishementSerializer(queryset, many=True)
                return JsonResponse(serializer.data, safe=False)
            return HttpResponse({"0 accomplishment found"})
        else:
            return HttpResponseNotAllowed
        

class GetLastAccomplishment(generics.GenericAPIView):
    model = Accomplishement
    queryset = Accomplishement.objects.all()
    serializer_class = AccomplishementSerializer

    def get(self, request):
        if request.method != "GET":
            return HttpResponseNotAllowed()
        
        queryset = self.queryset.values().first()
        if queryset is not None:
            serializer = AccomplishementSerializer(queryset, many=False)
            return JsonResponse(serializer.data)
        return HttpResponse({'0 accomplishment found.'})

        
class GetAccomplishmentByTitle(generics.GenericAPIView):
    model = Accomplishement
    queryset = Accomplishement.objects.all()
    serializer_class = AccomplishementSerializer

    def get(self, request, title=None):
        if request.method != "GET":
            return HttpResponseNotAllowed
        
        if id is not None:
            queryset = self.queryset.filter(title=title).values().first()
            if queryset is not None and len(queryset) > 0:
                serializer = AccomplishementSerializer(queryset, many=False)
                return JsonResponse(serializer.data)
            return HttpResponseNotFound
        return HttpResponse({"0 accomplishment found"})
    
class UpdateOrCreateAccomplishments(generics.GenericAPIView):
    model = Accomplishement
    serializer_class = AccomplishementSerializer
    permission_classes = [IsAdminUser, IsAuthenticated]

    def post(self, request):
        
        if request.method == "POST":
            data = request.data
            accomplishment = Accomplishement.objects.filter(title=data['title'])
            if len(accomplishment) > 0:
                return HttpResponse({'409': 'A resoure already exists with this name.'})
            serializer = AccomplishementSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return JsonResponse({'201': 'Success'})
        return HttpResponse({'Error while creating new accomplishment.'})
    
    def patch(self, request):

        if request.method == "PATCH":
            data = request.data
            accomplishment = Accomplishement.objects.filter(title=data['title']).first()
            if accomplishment and data['title'] == accomplishment.title:
                serializer = AccomplishementSerializer(accomplishment, data=data, partial=True)
                if serializer.is_valid(raise_exception=True):
                    serializer.save()
                    return HttpResponse({'200': 'Success'})
        return HttpResponse({'Error while creating new article.'})