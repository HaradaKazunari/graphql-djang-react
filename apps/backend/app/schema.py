from graphene import relay
from graphene_django import DjangoObjectType
from graphene_django.filter import DjangoFilterConnectionField

from .models import Category, Ingredient


class CategoryNode(DjangoObjectType):
    class Meta:
        model = Category
        interfaces = (relay.Node,)
        filter_fields = ["name", "ingredients", "is_active"]


class IngredientNode(DjangoObjectType):
    class Meta:
        model = Ingredient
        interfaces = (relay.Node,)
        filter_fields = {
            "name": ["exact", "icontains", "istartswith"],
            "notes": ["exact", "icontains"],
            "category": ["exact"],
            "category__name": ["exact"],
            "category__is_active": ["exact"],
        }


class IngredientConnection(relay.Connection):
    class Meta:
        node = IngredientNode


class Query:
    category = relay.Node.Field(CategoryNode)
    categories = DjangoFilterConnectionField(CategoryNode)

    ingredient = relay.Node.Field(IngredientNode)
    ingredients = relay.ConnectionField(IngredientConnection)

    def resolve_ingredients(root, info, **kwargs):
        return Ingredient.objects.filter(name="Eggs")
