import http from 'http';
import url from 'url';
import queryString from 'querystring';
import { spawn } from 'child_process';
import google from 'googleapis';

const OAuth2Client = google.auth.OAuth2;
const secrets = require(process.env.SECRET_FILE_PATH);

class Client {
  constructor(options = { scopes: [] }) {
    this.isAuthenticated = false;
    this._options = options;
    this._called = false;

    this.oAuth2Client = new OAuth2Client(
      secrets.web.client_id,
      secrets.web.client_secret,
      secrets.web.redirect_uris[0]
    );
  }

  _authenticate(scopes, callback) {
    this.authorizeUrl = this.oAuth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: scopes.join(' '),
    });
    const server = http.createServer((request, response) => {
      this._callOnce(() => {
        this._handler(request, response, server, callback);
      });
    }).listen(8080, () => {
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
    this.oAuth2Client.getToken(qs.code, (err, tokens) => {
      if (err) console.error(`Error getting oAuth tokens: ${err}`);
      this.oAuth2Client.setCredentials(tokens);
      this.isAuthenticated = true;
      response.end('Authentication successful!');
      callback(tokens);
      server.close();
    });
  }

  execute(scopes, callback) {
    if (this.isAuthenticated) {
      callback();
    } else {
      this._authenticate(scopes, callback);
    }
  }
}

new Client().execute(
  ['https://www.googleapis.com/auth/youtube'],
  tokens => console.log(tokens),
);
