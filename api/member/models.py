import random
import string
import uuid

from django.conf import settings
from django.core import validators
from django.db import models
from django.db import transaction
from django.db.utils import IntegrityError

from django.utils import timezone
from django.utils.translation import pgettext_lazy as p_
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth.models import AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
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


class AbstractUser(AbstractBaseUser, PermissionsMixin):
    """
    An abstract base class implementing a fully featured User model with
    admin-compliant permissions.

    Username, password and email are required. Other fields are optional.
    """
    username = models.CharField(_('username'), max_length=30, unique=True,
        help_text=_('Required. 30 characters or fewer. Letters, digits and '
                    '@/./+/-/_ only.'),
        validators=[
            validators.RegexValidator(r'^[\w.@+-]+$',
                                      _('Enter a valid username. '
                                        'This value may contain only letters, numbers '
                                        'and @/./+/-/_ characters.'), 'invalid'),
        ],
        error_messages={
            'unique': _("A user with that username already exists."),
        })
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    email = models.EmailField(_('email address'), unique=True, blank=True)
    is_staff = models.BooleanField(_('staff status'), default=False,
        help_text=_('Designates whether the user can log into this admin '
                    'site.'))
    is_active = models.BooleanField(_('active'), default=True,
        help_text=_('Designates whether this user should be treated as '
                    'active. Unselect this instead of deleting accounts.'))
    date_joined = models.DateTimeField(_('date joined'), default=timezone.now)

    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['']

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')
        abstract = True

    def get_full_name(self):
        """
        Returns the first_name plus the last_name, with a space in between.
        """
        full_name = '%s %s' % (self.first_name, self.last_name)
        return full_name.strip()

    def get_short_name(self):
        "Returns the short name for the user."
        return self.first_name

    def email_user(self, subject, message, from_email=None, **kwargs):
        """
        Sends an email to this User.
        """
        send_mail(subject, message, from_email, [self.email], **kwargs)


class User(AbstractUser):

    """a customable user model
    """

    mobile_phone = models.CharField(p_('User model', 'cell phone num'), max_length=32, default='')
    token = models.CharField(max_length=300, unique=True)

    objects = UserManager()

    def save(self, *args, **kwargs):
        if not self.token:
            for _ in range(100):
                token = uuid.uuid4().hex
                if not type(self).objects.filter(token=token).exists():
                    self.token = token
                    break

        return super().save(*args, **kwargs)
