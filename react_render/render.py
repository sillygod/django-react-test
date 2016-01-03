import os

from django.contrib.staticfiles import finders

from .exceptions import ComponentFileNotFound
from .server_render import ServerRender


def render_component(path, props=None, to_static_markup=False):
    if not os.path.isabs(path):
        abs_path = finders.find(path)

        if not abs_path:
            raise ComponentFileNotFound(path)

        path = abs_path

    if not os.path.exists(path):
        raise ComponentFileNotFound(path)

    renderer = ServerRender()
    return renderer.render(path, props, to_static_markup)
