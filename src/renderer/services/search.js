import { inspect } from 'util';
import google from 'googleapis';
import client from './client';

const scopes = [
  'https://www.googleapis.com/auth/youtube',
];

const youtube = google.youtube({
  version: 'v3',
  auth: client.oAuth2Client,
});

export function search(q) {
  return new Promise((resolve, reject) => {
    client.execute(scopes, () => {
      youtube.search.list({
        part: 'snippet',
        q,
      }, (err, data) => {
        if (err) return reject(err);
        resolve(data.items);
      });
    });
  });
};
