import datetime

from django.db import models


# Create your models here.

class Discussion(models.Model):
    subject_name = models.CharField(max_length=200, verbose_name='Subject')
    text = models.TextField()
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)
    discussion_creation_time = models.DateTimeField(default=datetime.datetime.today())
    discussion_reactions = models.JSONField(default=dict, blank=True, null=True)

    def __str__(self):
        return f"Discussion {self.subject_name} by {self.author}: last_comment {self.discussion_creation_time}"



class Comment(models.Model):
    class Meta:
        db_table = 'comments'

    comment_text = models.TextField()
    commented_discussion = models.ForeignKey( Discussion, related_name='comments', on_delete=models.CASCADE)
    comment_author = models.ForeignKey('auth.User', on_delete=models.DO_NOTHING)
    comment_time = models.DateTimeField(default=datetime.datetime.today())
    comment_reactions = models.JSONField(default=dict, blank=True, null=True)

    def __str__(self):
        return f"Comment  {self.comment_text} by {self.comment_author} on {self.commented_discussion.subject_name}"
