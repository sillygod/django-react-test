import os

from django.shortcuts import render
from django.conf import settings

from react_render.render import render_component


def index(request):

    base_dir = settings.BASE_DIR

    rendered = render_component(
        os.path.join(base_dir, 'assets/js/components/HelloMessage.jsx'),
        to_static_markup=False)

    context = {}
    return render(request, 'index.html', context)
