from django.urls import path, re_path
from . import views

app_name = 'discussions'


urlpatterns = [
    path('', views.DiscussionsListView.as_view(), name='all'),
    re_path(r'^addreaction/(?P<object_id>\d+)/(?P<object_type>\w+)/(?P<reaction_type>\w+)', views.add_reaction, name='add_reaction'),
    re_path(r'^detailed/(?P<discussion_id>\d+)/addcomment', views.add_comment, name='add_comment'),
    re_path(r'^detailed/addreaction/(?P<object_id>\d+)/(?P<object_type>\w+)/(?P<reaction_type>\w+)', views.add_reaction, name='add_reaction'),
    re_path(r'^detailed/(?P<discussion_id>\d+)', views.discussion_detailed, name='discussion_detailed'),
    #re_path(r'adddiscussion/', views.discussion_new, name='new_discussion'),
    re_path(r'adddiscussion/', views.add_discussion, name='add_discussion'),
    #re_path(r'showemodjis/', views.open_emojis_in_dropdown_view, name='open_emodjis_in_dropdown'),
    path('read-text/', views.read_text, name='read_text'),
    re_path(r'^login/$', views.user_login, name='login'),
    path('logout/', views.user_logout, name='logout'),
    path('register/', views.RegisterUser.as_view(), name='register')
]
