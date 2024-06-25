import graphene
from graphene import relay, Mutation
from graphql_relay import from_global_id
from graphene_django import DjangoObjectType
from app.models import Ingredient


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


class CreateIngredient(Mutation):
    class Arguments:
        name = graphene.String(required=True)
        category_id = graphene.ID(required=True)

    ingredient = graphene.Field(IngredientNode)

    def mutate(self, info, **input):
        ingredient = Ingredient(
            name=input["name"],
            category_id=input["category_id"],
        )
        ingredient.save()
        return CreateIngredient(ingredient=ingredient)


class UpdateIngredient(Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        name = graphene.String()
        category_id = graphene.String()

    ingredient = graphene.Field(IngredientNode)

    def mutate(self, info, **input):
        ingredient = Ingredient.objects.get(
            pk=from_global_id(input["id"])[1],
        )
        if input["name"]:
            ingredient.name = input["name"]
        if input["category_id"]:
            node = from_global_id(input["category_id"])
            ingredient.category_id = node.id
        ingredient.save()
        return UpdateIngredient(ingredient=ingredient)
