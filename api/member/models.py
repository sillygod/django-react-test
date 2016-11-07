import random
import string
import uuid

from django.conf import settings
from django.db import models
from django.db import transaction
from django.db.utils import IntegrityError

from django.utils import timezone
from django.utils.translation import pgettext_lazy as _
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import BaseUserManager


class UserManager(BaseUserManager):

    """Customize the creatioin of user and super user
    """

    def _create_user(self, username, email, password, mobile_number, is_staff=False, is_superuser=False, **kwargs):

        now = timezone.now()
        if not username:
            raise ValueError("The given username must be set")

        email = self.normalize_email(email)
        user = self.model(username=username, email=email,
                          is_staff=is_staff, is_active=True,
                          is_superuser=is_superuser, mobile_number=mobile_number,
                          date_joined=now, **kwargs)

        user.set_password(password)

        with transaction.atomic():
            user.save(using=self._db)
            # you can create other models foreign to model User here

        return user

    def create_user(self, email, username='', password=None, mobile_number='', is_staff=False,
                    is_superuser=False, **kwargs):
        if username == '':
            username = email.split('@')[0]
        if password is None:
            password = ''.join(random.sample(string.ascii_letters + string.digits, 10))

        return self._create_user(username, email, password, mobile_number, is_staff, is_superuser, **kwargs)

    def create_superuser(self, email, username='', password=None, mobile_number='', **kwargs):
        if username == '':
            username = email.split('@')[0]

        return self._create_user(username, email, password, mobile_number, True, True, **kwargs)


class User(AbstractUser):

    """a customable user model
    """

    mobile_phone = models.CharField(_('User model', 'cell phone num'), max_length=32, default='')
    token = models.CharField(max_length=300, unique=True)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def save(self, *args, **kwargs):
        if not self.token:
            for _ in range(100):
                token = uuid.uuid4().hex
                if not type(self).objects.filter(token=token).exists():
                    self.token = token
                    break

        return super().save(*args, **kwargs)
