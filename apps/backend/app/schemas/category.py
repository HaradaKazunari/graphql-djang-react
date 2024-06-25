from graphene import relay
from graphene_django import DjangoObjectType
from app.models import Category


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        interfaces = (relay.Node,)
        filter_fields = ["name", "ingredients", "is_active"]
