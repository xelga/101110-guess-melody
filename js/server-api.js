import {adaptServerData} from './data-adapter.js';
import {adaptServerResults} from './results-adapter.js';

const SERVER_URL = `https://es.dump.academy/guess-melody`;
const APP_ID = 3265133;

const checkStatus = (response) => {
  if (response.status === 404) {
    return [];
  } else if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    throw new Error(`${response.status}`);
  }
};

const toJSON = (response) => response.json();

export default class serverApi {
  static loadData() {
    return window.fetch(`${SERVER_URL}/questions`)
      .then(checkStatus)
      .then(toJSON)
      .then(adaptServerData);
  }

  static saveResults(data) {
    const requestSettings = {
      body: JSON.stringify(data.userAnswers),
      headers: {
        'Content-Type': `application/json`
      },
      method: `POST`
    };
    return window.fetch(`${SERVER_URL}/stats/:${APP_ID}`, requestSettings)
      .then(checkStatus);
  }

  static loadResults() {
    return window.fetch(`${SERVER_URL}/stats/:${APP_ID}`)
    .then(checkStatus)
    .then((response) => {
      if (response.length === 0) {
        return [];
      }
      return toJSON(response);
    })
    .then((data) => {
      if (data.length === 0) {
        return [];
      }
      return adaptServerResults(data);
    });
  }
}
