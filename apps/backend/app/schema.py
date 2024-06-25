from graphene import relay
from graphene_django.filter import DjangoFilterConnectionField
from app.schemas.category import CategoryNode
from app.schemas.ingredient import IngredientNode, CreateIngredient, UpdateIngredient


class Query:
    category = relay.Node.Field(CategoryNode)
    categories = DjangoFilterConnectionField(CategoryNode)

    ingredient = relay.Node.Field(IngredientNode)
    ingredients = DjangoFilterConnectionField(IngredientNode)


class Mutation:
    create_ingredient = CreateIngredient.Field()
    update_ingredient = UpdateIngredient.Field()
