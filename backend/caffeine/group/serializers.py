'''
from rest_framework import serializers
from .models import Group
from user.models import User

class MemberSerializer(serializers.ModelSerializer):

    class Meta:
        fields = '__all__'
        model = User

class GroupSerializer(serializers.ModelSerializer):
    members = MemberSerializer(read_only=True, many=True)

    class Meta:
        fields = '__all__'
        model = Group
'''