from google.appengine.ext import ndb

from extensions.creator_model import CreatorModel


class ProjectModel(CreatorModel):
    ShortMaxLength = 120

    name = ndb.StringProperty(required=True)
    short = ndb.StringProperty(required=True)
    long = ndb.StringProperty()
    content = ndb.JsonProperty(repeated=True)
    website = ndb.StringProperty()
    tech_stack = ndb.StringProperty(repeated=True)
    featured_video = ndb.StringProperty()
    videos = ndb.StringProperty(repeated=True)
    file_keys = ndb.KeyProperty(kind='MediaModel', repeated=True)
    image_keys = ndb.KeyProperty(kind='MediaModel', repeated=True)
    featured_image_key = ndb.KeyProperty(kind='MediaModel')
    logo_key = ndb.KeyProperty(kind='MediaModel')

    def __init__(self, *args, **kwds):
        super(ProjectModel, self).__init__(*args, **kwds)
        self._cached_files = None
        self._cached_images = None
        self._cached_featured_image = None
        self._cached_logo = None

    @property
    def files(self):
        if self.file_keys and not self._cached_files:
            self._cached_files = ndb.get_multi(self.file_keys)
        return self._cached_files

    @property
    def images(self):
        if self.image_keys and not self._cached_images:
            self._cached_images = ndb.get_multi(self.image_keys)
        return self._cached_images

    @property
    def featured_image(self):
        if self.featured_image_key and not self._cached_featured_image:
            self._cached_featured_image = self.featured_image_key.get()
        return self._cached_featured_image

    @property
    def logo(self):
        if self.logo_key and not self._cached_logo:
            self._cached_logo = self.logo_key.get()
        return self._cached_logo

