from django.contrib import admin
from django.urls import path

from graphene_django.views import GraphQLView
from config.schema import schema

urlpatterns = [
    path("admin/", admin.site.urls),
    path(
        "api/graphql/",
        GraphQLView.as_view(
            graphiql=True,
            schema=schema,
        ),
    ),
]
