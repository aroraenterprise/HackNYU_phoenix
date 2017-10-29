import time
from google.appengine.ext import ndb

from app.media import helper
from config import config
from extensions.creator_model import CreatorModel


class MediaType:
    Photo = 'photo'

    content_types = {
        Photo: 'image/'
    }

    content_max_length = {
        Photo: 5242880
    }

    @classmethod
    def get_content_type(cls, contentType):
        if contentType not in cls.content_types:
            raise Exception('requested a non-existent content-type for: %s' % contentType)
        return cls.content_types.get(contentType)

    @classmethod
    def get_content_max_length(cls, contentType):
        if contentType not in cls.content_max_length:
            raise Exception('requested a non-existent content-type for: %s' % contentType)
        return cls.content_max_length.get(contentType)

class MediaModel(CreatorModel):
    store_path = ndb.StringProperty(required=True, indexed=False)  # private property
    media_type = ndb.StringProperty(required=True)

    filename = ndb.StringProperty(required=True, indexed=False)
    content_type = ndb.StringProperty(required=True, indexed=False)
    data = ndb.JsonProperty(indexed=False)
    is_public = ndb.BooleanProperty(default=False)


    def __init__(self, *args, **kwds):
        super(MediaModel, self).__init__(*args, **kwds)
        self._cache_url = None

    @property
    def url(self):
        if not self._cache_url:
            self._cache_url = helper.get_signed_url(
                self.store_path,
                int(time.time() + config.Google.download_url_expiry)
            )
        return self._cache_url