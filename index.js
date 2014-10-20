'use strict';

var url = require('url');
var contra = require('contra');
var request = require('request');

function createClient (o) {
  var secret;
  var auth;

  if (!o.api) {
    throw new Error('Required API endpoint not set!');
  }

  function resolve (endpoint) {
    return url.resolve(o.api, endpoint);
  }

  // wrap response handlers for consistent error reporting
  function handled (next) {
    return function handler (err, res, body) {
      if (body.status === 'err') {
        next(new Error(body.error));
      } else {
        next(null, body);
      }
    };
  }

  function m (method, endpoint, data, next) {
    // cookie for authentication
    var authCookie;
    var jar = request.jar();
    if (auth) {
      authCookie = request.cookie('auth=' + auth);
      jar.setCookie(authCookie, o.api);
    }

    // api secret for form
    if (data && secret) {
      data.apisecret = secret;
    }

    request({
      uri: url.resolve(o.api, endpoint),
      form: data,
      json: true,
      method: method,
      jar: jar
    }, handled(next));
  }

  var get = m.bind(null, 'GET');
  var post = m.bind(null, 'POST');

  function login (data, done) {
    function query (next) {
      get('/api/login', data, next);
    }

    function response (body, next) {
      if (body.apisecret && body.auth) {
        secret = body.apisecret;
        auth = body.auth;
      }
      next();
    }

    contra.waterfall([query, response], done);
  }

  function submit (data, done) {
    if (!data.news_id) { data.news_id = -1; }
    if (!data.url) { data.url = '' }
    if (!data.text) { data.text = ''; }
    post('/api/submit', data, done);
  }

  function remove (data, done) {
    post('/api/delnews', data, done);
  }

  return {
    login: login,
    submit: submit
  };
}

module.exports = {
  createClient: createClient
};
