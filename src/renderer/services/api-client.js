/* eslint-disable no-underscore-dangle */
import http from 'http';
import url from 'url';
import queryString from 'querystring';
import { spawn } from 'child_process';
import google from 'googleapis';
import lodash from 'lodash';
import { callAction, saveAuthToken } from '../actions';

const OAuth2Client = google.auth.OAuth2;

class Client {
  constructor(options = { scopes: [] }) {
    this.isAuthenticated = false;
    this._options = options;
    this._called = false;

    this.oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.REDIRECT_URI,
    );
  }

  _authenticate(scopes, callback) {
    this.authorizeUrl = this.oAuth2Client.generateAuthUrl({
      scope: scopes.join(' '),
    });
    const server = http.createServer((request, response) => {
      this._callOnce(() => {
        this._handler(request, response, server, callback);
      });
    }).listen(url.parse(process.env.REDIRECT_URI).port, () => {
      spawn('open', [this.authorizeUrl]);
    });
  }

  _callOnce(callback) {
    if (!this._called) {
      this._called = true;
      callback();
    }
  }

  _handler(request, response, server, callback) {
    const qs = queryString.parse(url.parse(request.url).query);
    this.oAuth2Client.getToken(qs.code, (err, token) => {
      // eslint-disable-next-line no-console
      if (err) console.error(`Error getting oAuth token: ${err}`);

      callAction(saveAuthToken, token);
      this.setAuth(token);
      response.end('Authentication successful!');
      callback();
      server.close();
    });
  }

  setAuth(token) {
    this.oAuth2Client.setCredentials(token);
    this.isAuthenticated = true;
  }

  execute(scopes, token, callback) {
    if (!lodash.isEmpty(token)) {
      this.setAuth(token);
      return callback();
    }
    if (this.isAuthenticated) return callback();

    return this._authenticate(scopes, callback);
  }

  refreshToken() {
    return new Promise((resolve, reject) => {
      this.oAuth2Client.refreshAccessToken((err, newToken) => {
        if (err) return reject(err);

        return resolve(newToken);
      });
    });
  }
}

export default new Client();
