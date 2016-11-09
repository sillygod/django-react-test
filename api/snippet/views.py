from rest_framework import (
    status,
    generics,
    mixins
)

from rest_framework.viewsets import GenericViewSet
from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework.compat import OrderedDict

from api.utils import (
    format_response,
    api_error_handler
)

from snippet.serializers import SnippetSerializer


class BasePagination(PageNumberPagination):

    page_size = 20
    page_size_query_param = 'page_size'
    max_page_size = 500

    def get_paginated_response(self, data):
        other_kwargs = OrderedDict([
            ('count', self.page.paginator.count),
            ('next', self.get_next_link()),
            ('previous', self.get_previous_link())
        ])
        return Response(format_response(200, data=data, **other_kwargs), status.HTTP_200_OK)


class SnippetPagination(BasePagination):

    page_size = 30
    max_page_size = 100


class SnippetViewSet(mixins.CreateModelMixin,
                     mixins.UpdateModelMixin,
                     GenericViewSet):

    """
    """

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        return Response(data, status=status.HTTP_200_OK)
