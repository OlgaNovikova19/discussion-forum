from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.core.exceptions import ObjectDoesNotExist
import json
import io

from django.urls import reverse_lazy

from .models import Discussion, Comment
from django.views.generic import ListView, CreateView
from django.shortcuts import render, redirect, get_object_or_404
from django.http import HttpResponse, Http404, HttpResponseRedirect, JsonResponse
from .forms import CommentForm, TopicStartForm, LoginUserForm, RegisterUserForm
from datetime import datetime, timedelta
import os
from django.conf import settings
import logging
from gtts import gTTS


logger = logging.getLogger(__name__)



class DiscussionsListView(ListView):
    model = Discussion
    template_name = 'discussions_list.html'


def discussion_detailed(request, discussion_id):
    discussion = get_object_or_404(Discussion, id=discussion_id)
    comments = discussion.comments.all()
    comment_form = CommentForm()
    reaction_types = ['like', 'surprised']
    context = {'discussion': discussion, 'comments': comments, 'form': comment_form, 'reaction_types': reaction_types}
    template_name = 'discussion_detailed_with_comments_list.html'
    return render(request, template_name, context)

def discussion_new(request):
    template_name = 'add_new_discussion_topic.html'
    new_topic_form = TopicStartForm()
    context = {'form': new_topic_form,}
    return render(request, template_name, context)

@login_required
def add_reaction(request, object_id, object_type, reaction_type):
    user_id = str(request.user.id)
    if object_type in request.COOKIES:
        object_with_reactions_ids_list = json.loads(request.COOKIES[object_type])
        if str(object_id) in object_with_reactions_ids_list:
            return redirect(request.GET.get('next', '/discussions'))
    else:
        object_with_reactions_ids_list = []

    if object_type == 'user_discussion':
        obj = get_object_or_404(Discussion, id=object_id)
        if obj.discussion_reactions is not None:
            number_reactions = obj.discussion_reactions.get(reaction_type, 0) + 1
        else:
            obj.discussion_reactions = {}
            number_reactions = 0
        obj.discussion_reactions[reaction_type] = number_reactions

    elif object_type == 'user_comment':
        obj = get_object_or_404(Comment, id=object_id)
        if obj.comment_reactions is not None:
            number_reactions = obj.comment_reactions.get(reaction_type, 0) + 1
        else:
            number_reactions = 0
        obj.comment_reactions[reaction_type] = number_reactions

    else:
        return redirect(request.GET.get('next', '/discussions'))

    obj.save()
    response = HttpResponseRedirect(request.GET.get('next', '/discussions'))
    object_with_reactions_ids_list.append(str(object_id))

    expires_at = datetime.now() + timedelta(days=365)
    response.set_cookie(object_type, json.dumps(object_with_reactions_ids_list), expires=expires_at)

    return response

@login_required
def add_discussion(request):
    if request.method == 'POST':
        form = TopicStartForm(request.POST, request.FILES)
        if form.is_valid():
            discussion = form.save(commit=False)
            discussion.author = request.user
            discussion.save()
            #request.session.modified=True
            #request.session.set_expiry(60)
            #request.session['pause'] = True
        #return redirect('/discussions/detailed/%s' % discussion_id)
        return redirect('/discussions')
    else:
        form = TopicStartForm()

    return render(request, 'add_new_discussion_topic.html', {'form': form})

@login_required
def add_comment(request, discussion_id):
    with open("add_comment_log.txt", "a") as log_file:
        log_file.write("add_comment called\n")

        if request.method == 'POST':
            log_file.write("add_comment called with POST\n")
            form = CommentForm(request.POST)
            if form.is_valid():
                log_file.write("add_comment - form is valid\n")
                comment = form.save(commit=False)
                comment.commented_discussion = Discussion.objects.get(id=discussion_id)

                comment.comment_author = request.user
                comment.save()

                log_file.write("add_comment - comment saved\n")
                #request.session.modified=True
                #request.session.set_expiry(60)
                #request.session['pause'] = True
            else:
                log_file.write("add_comment - form is not valid\n")
            return redirect('/discussions/detailed/%s' % discussion_id)


def user_login(request):
    if request.method == 'POST':
        form = LoginUserForm(request.POST)
        if form.is_valid():
            cleaned_data = form.cleaned_data
            user = authenticate(request, username=cleaned_data['username'], password=cleaned_data['password'])
            if user and user.is_active:
                login(request, user)
                return redirect('/discussions')

    else:
        form = LoginUserForm()
    return render(request, 'login.html', {'form': form})

def user_logout(request):
    logout(request)
    return render(request, 'logout.html')

class RegisterUser(CreateView):
    form_class = RegisterUserForm
    template_name = 'register.html'
    extra_context = {'title': "Registration"}
    success_url = reverse_lazy('users:login')

def open_emojis_in_dropdown_view(request):
    template_name = 'add_new_discussion_topic.html'

    emoji_folder = os.path.join(settings.BASE_DIR, 'static', 'images', 'emoji')
    emoji_files = [file for file in os.listdir(emoji_folder) if file.endswith(('.png', '.jpg', '.gif'))]

    emoji_files = [f'images/emoji/{f}' for f in emoji_files]  # relative paths"""

    return render(request, template_name, {'emoji_files':emoji_files})


def read_text(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Incorrect method provided (POST is expected).'}, status=400)

    logging.info("Produce sound for text.")

    data = json.loads(request.body)
    text = data.get('text')

    if not text:
        return JsonResponse({'error': 'No text provided'}, status=400)

    tts = gTTS(text=text, lang='en')

    default_file_name = "temporary_output.mp3"
    if os.path.exists(default_file_name):
        os.remove(default_file_name)

    tts.save(default_file_name)

    if os.path.exists(default_file_name) is True:
        with open(default_file_name, 'rb') as audio_file:
            response = HttpResponse(audio_file.read(), content_type='audio/mpeg')
            return response
    else:
        return JsonResponse({'error': 'The text was not sounded.'}, status=400)
