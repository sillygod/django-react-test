import json
import requests
import hashlib

from django.conf import settings
from django.core import serializers

from .exceptions import RenderServerError
from .exceptions import ReactRenderingError
from .exceptions import ComponentFileNotFound


class RenderedComponent:

    """
    """

    def __init__(self, markup, props):
        self.markup = markup
        self.props = props

    def __str__(self):
        return self.markup


class ServerRender:

    """
    """

    def __init__(self):
        self._enable = False
        self._render_url = ''
        self._react_settings = getattr(settings, 'REACT', None)

        if self._react_settings is not None:
            self._enable = self._react_settings['ENABLE']
            self._render_url = self._react_settings['RENDER_URL']

    def render(self, path, props=None, to_static_markup=False):

        if props is not None:
            serialized_props = json.dumps(props)
        else:
            serialized_props = None

        if not self._enable:
            return RenderedComponent('', serialized_props)

        options = {
            'path': path,
            'serializedProps': serialized_props,
            'toStaticMarkup': to_static_markup
        }

        serialized_options = json.dumps(options)
        option_hash = hashlib.sha1(
            serialized_options.encode('utf-8')).hexdigest()

        try:
            res = requests.post(self._render_url,
                                data=serialized_options,
                                headers={'content-type': 'application/json'},
                                params={'hash': option_hash})

        except requests.ConnectionError:
            raise RenderServerError('could not connect to server at {}'.format(
                self._render_url))

        if res.status_code != 200:
            raise RenderServerError(
                'unexpected response from render server at {} - {}:{}'.format(
                    self._render_url, res.status_code, res.text))

        obj = res.json()
        markup = obj.get('markup', None)
        err = obj.get('error', None)

        if err:
            if 'message' in err and 'stack' in err:
                raise ReactRenderingError(
                    'Message: {}\n\nStack Trace: {}'.format(err['message'],
                                                            err['stack']))

                raise ReactRenderingError(err)

        if markup is None:
            raise ReactRenderingError('server render failed to return markup. \
                    return: {}'.format(markup))

        return RenderedComponent(markup, serialized_props)
