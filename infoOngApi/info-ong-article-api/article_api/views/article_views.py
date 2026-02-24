from django.contrib.auth.models import User
from django.http import JsonResponse, HttpResponse, HttpResponseForbidden
from article_api.serializers import ArticleSerializer
from article_api.models.article_model import Article
from rest_framework import generics, viewsets
from rest_framework.permissions import IsAdminUser, IsAuthenticated
import json



class ArticleListViews(viewsets.ModelViewSet):
    queryset = Article.objects.all().order_by('-creation_date')
    serializer_class = ArticleSerializer

    def list(self, request):
        if request.method == "GET":
            queryset = self.get_queryset()
            if queryset is not None and len(queryset) > 0:
                serializer = ArticleSerializer(queryset, many=True)
                return JsonResponse(serializer.data, safe=False)
            return HttpResponse({"0 article found."})
    
class GetLastArticle(generics.GenericAPIView):
    model = Article
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get(self, request):
        if request.method == "GET":
            queryset = self.queryset.values().first()
            if queryset is not None:
                serializer = ArticleSerializer(queryset, many=False)
                return JsonResponse(serializer.data)
            return HttpResponse({"0 article found."})

class GetArticleByTitle(generics.GenericAPIView):   
    model = Article
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    def get(self, request, title=None):
        if title is not None and request.method == "GET":
            queryset = self.queryset.filter(title=title).values().first()
            if queryset is not None and len(queryset) > 0:
                serializer = ArticleSerializer(queryset, many=False)
                return JsonResponse(serializer.data)
            return HttpResponse({"0 article found."})

class UpdateOrCreateArticle(generics.GenericAPIView):   
    model = Article
    serializer_class = ArticleSerializer
    permission_classes = [IsAdminUser, IsAuthenticated]

    def post(self, request):

        if request.method == "POST":
            data = request.data
            article = Article.objects.filter(title=data['title'])
            if len(article) > 0:
               return HttpResponse({'409': 'A resoure already exists with this name.'})           
            serializer = ArticleSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return JsonResponse({'201': 'Success'})
        return HttpResponse({'Error while creating new article.'})
    

    def patch(self, request):
        
        if request.method == "PATCH":
           data = request.data
           article = Article.objects.filter(title=data['title']).first()
           if article and data['title'] == article.title:
                serializer = ArticleSerializer(article, data=data, partial=True)
                if serializer.is_valid():
                    serializer.save()
                    return HttpResponse({'200': 'Success'})
                else:
                    print(serializer.error_messages)
        return HttpResponse({'Error while creating new article.'})
 