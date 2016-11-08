from django.db import models
from django.conf import settings
from django.utils import timezone


class Snippet(models.Model):

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, related_name='snippets')
    title = models.CharField(max_length=100, blank=True, default='')
    code = models.TextField()
    linenos = models.BooleanField(default=False)
    language = models.CharField(max_length=100, default='')

    created = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ('created', )
