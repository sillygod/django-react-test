# Django React Test

[![Build Status](https://travis-ci.org/sillygod/django-react-test.svg?branch=master)](https://travis-ci.org/sillygod/django-react-test)


This is a experimental project for react and redux with django. 


# Architecture

Basically, django as a pure `api server` (backend). Frontend is responsible for i18n, url router, and server render.


### Frontend

We use the following techniques.

 - postcss
 - react
 - redux
 - express
 - babel
 
 
some devtools
 
 - webpack dev middleware
 - webpack hot middleware
 - redux dev tools
 



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

### eslint issue

currently, I disable the eslint-loader function because it's so fucking annoying.
there will be so many error..

you can take it back by adding 

```
{test: /\.jsx?$/, exclude: /node_modules/, loaders: ['babel?'+JSON.stringify(babelLoaderQuery), 'eslint-loader']},
```

in the `dev.config.js` file.

# Reference

 - https://github.com/erikras/react-redux-universal-hot-example/blob/master/src/helpers/Html.js


