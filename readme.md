# Django React Test

[![Build Status](https://travis-ci.org/sillygod/django-react-test.svg?branch=master)](https://travis-ci.org/sillygod/django-react-test)


This is a experimental project for react and redux with django. 


# Architecture

Basically, django as a pure `api server` (backend). Frontend is responsible for i18n, url router, and server render.


### Frontend

We use the following techniques.

 - postcss (precss)
 - react
 - redux
 - express
 - babel
 
 
some devtools
 
 - webpack dev middleware
 - webpack hot middleware
 - redux dev tools
 


### backend

 - django the newest version below 1.9
 - django rest framework the newest version
 - django rest framework swagger (for doc) 
 - pytest (dev use)


# Install 

```sh
pip install -r requirements.txt # for prod
pip install -r requirements_dev.txt # for development

npm install
npm install -g concurrently
```


# Development

```sh
npm run dev
```



# Roadmap

 - [ ] a simple frontend example
 - [ ] jwt auth implement
 - [ ] api design

# Reference

 - https://github.com/erikras/react-redux-universal-hot-example/
 - http://hirelofty.com/blog/auto-generate-swagger-docs-your-django-api/

