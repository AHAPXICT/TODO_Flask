from time import time
import slugify


def slug_generator(s: str) -> str:
    new_slug = slugify.slugify(s, only_ascii=True)
    return new_slug + '-' + str(int(time()))


print(slug_generator('якась нотатка'))
