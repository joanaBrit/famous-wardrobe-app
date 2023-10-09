from rest_framework import serializers
from django.contrib.auth import get_user_model


User = get_user_model()

# Custom Register Serializer Class
# this will allow us to convert the date from db into python datatypes
class RegisterSerializer(serializers.ModelSerializer):
    
    # don't want password to be serialized when querying
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password', 'password_confirmation', 'bio') 

    def validate(self, data):
        # Validate method
        # Run validation here, then throw an error or return the data
        password = data.get('password')
        password_confirmation = data.pop('password_confirmation')

        if password != password_confirmation:
            raise serializers.ValidationError('The passwords you entered do not match. Please make sure you type the same password in both fields.')
        return data
    
    # Hash the password
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user