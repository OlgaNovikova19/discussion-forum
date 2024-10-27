from django import template

import json
import re

register = template.Library()


@register.filter
def dict_key(dictionary, key):
    if isinstance(dictionary, str):

        try:
            dictionary = json.loads(dictionary)
        except json.JSONDecodeError:
            return 0
    if isinstance(dictionary, dict):
        return dictionary.get(key, 0)
    return 0


@register.filter
def default_if_none_dict(value):
    return value if value is not None else {}


@register.filter
def is_base64_image(text):
    BASE64_IMAGE_REGEX = r'<img\s+[^>]*src=["\']data:image/|https?://'
    return bool(re.search(BASE64_IMAGE_REGEX, text))


@register.filter
def extract_base64_image(html_content):
    BASE64_IMAGE_REGEX = r'<img\s+[^>]*src=["\'](data:image/[^"\']+|https?://[^"\']+)["\']'
    match = re.search(BASE64_IMAGE_REGEX, html_content)
    if match:
        return match.group(1)
    return None
