from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError
from django.forms import ModelForm, Textarea, Form, CharField, TextInput, PasswordInput
from .models import Discussion, Comment


class TopicStartForm(ModelForm):
    class Meta:
        model = Discussion
        fields = ['subject_name', 'text']
        widgets = {
            'subject_name':Textarea(attrs={
                'id': 'subjectEditor',
                'placeholder': 'the topic you want to discuss'}),
            'text': Textarea(attrs={
                'id': 'textEditor',
                'placeholder': 'to start new discussion thread enter text here...',
            }),
        }

class CommentForm(ModelForm):
    class Meta:
        model = Comment
        fields = ['comment_text']
        widgets = {
            'comment_text': Textarea(attrs={
                'placeholder': 'Enter your comment here...',
            }),
        }

class LoginUserForm(Form):
    username = CharField(label='Login', widget=TextInput(attrs={'class':'form-input'}))
    password = CharField(label='Password', widget=PasswordInput(attrs={'class': 'form-input'}))

class RegisterUserForm(UserCreationForm):
    username = CharField(label='Login', widget=TextInput(attrs={'class': 'form-input'}))
    password1 = CharField(label='Password', widget=PasswordInput(attrs={'class': 'form-input'}))
    password2 = CharField(label='Repeat password ', widget=PasswordInput(attrs={'class': 'form-input'}))

    class Meta:
        model = get_user_model()
        fields = ['username', 'email', 'first_name', 'last_name', 'password1', 'password2']
        labels = {
            'email': 'E-mail',
            'first_name': 'Name',
            'last_name': 'Last name',
        }
        widgets = {
            'email': TextInput(attrs={'class': 'form-input'}),
            'first_name': TextInput(attrs={'class': 'form-input'}),
            'last_name': TextInput(attrs={'class': 'form-input'}),
        }

    def clean_email(self):
        email = self.cleaned_data['email']
        if User.objects.filter(email=email).exists():
            raise ValidationError("This e-mail already exists")
        return email
