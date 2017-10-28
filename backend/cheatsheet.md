## To login
gcloud auth login

## To switch projects
gcloud config set project 'project_id'

## To upload to google appengine
gcloud beta app deploy --version=v1 ./app.yaml

## To set cors headers on cloud storage uploads
gsutil cors set ../bucket-cors.json gs://bucket_name_here

bucket-cors.json example:
[
  {
    "origin": ["*"],
    "responseHeader": ["Content-Type"],
    "method": ["GET", "HEAD", "DELETE"],
    "maxAgeSeconds": 3600
  }
]
