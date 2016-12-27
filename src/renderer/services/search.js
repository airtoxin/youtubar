/* eslint-disable import/prefer-default-export */
import google from 'googleapis';
import apiClient from './api-client';

const scopes = [
  'https://www.googleapis.com/auth/youtube',
];

const youtube = google.youtube({
  version: 'v3',
  auth: apiClient.oAuth2Client,
});

export function search(q, token) {
  return new Promise((resolve, reject) => {
    apiClient.execute(scopes, token, () => {
      youtube.search.list({
        part: 'snippet',
        type: 'video',
        maxResults: 20,
        q,
      }, (err, data) => {
        if (err) return reject(err);
        return resolve(data.items);
      });
    });
  });
}
