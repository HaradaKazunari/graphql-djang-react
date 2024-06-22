import graphene
from graphene import relay
from graphene_django import DjangoObjectType
from graphql_relay import from_global_id
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


class Mutation(relay.ClientIDMutation):
    class Input:
        id = graphene.ID()
        name = graphene.String(required=True)
        note = graphene.String()
        category = graphene.Int()

    ingredient = graphene.Field(IngredientNode)

    @classmethod
    def mutate_and_get_payload(cls, root, info, **input):
        ingredient = Ingredient.objects.get(pk=from_global_id(id)[1])
        # ingredient.name = input.name
        # ingredient.note = input.note
        # ingredient.category = input.category
        # ingredient.save()
        return Mutation(ingredient=ingredient)
