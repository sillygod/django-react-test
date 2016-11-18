from django.contrib.auth import get_user_model
from rest_framework import serializers
from member.models import User


class UserSerializer(serializers.ModelSerializer):


    class Meta:
        model = get_user_model()
        fields = ('id', 'username', )


class UserSerializerNew(serializers.ModelSerializer):


    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email',)
