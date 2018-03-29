import { URL } from '../constants/constants';

export function getCountryHeadlines(country) {
  var url = URL;
  if(country) {
    url = url + `&country=${country}`;
  }
  var req = new Request(url);
  return fetch(req)
    .then((response) => {
      return response.json();
    })
}

export function getSourceHeadlines(source) {
  var url = URL;
  if (source) {
    url = url + `&sources=${source}`;
  }
  var req = new Request(url);
  return fetch(req)
    .then((response) => {
      return response.json();
    })
}