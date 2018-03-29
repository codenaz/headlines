import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import idb from 'idb';

ReactDOM.render(<App />, document.getElementById('root'));

//open indexed db
function openDatabase() {
  if (!navigator.serviceWorker) {
    return Promise.resolve();
  }

  return idb.open('headlines', 1, function (upgradeDb) {
    var store = upgradeDb.createObjectStore('headlines', {
      keyPath: 'id'
    });
    store.createIndex('by-date', 'publishedAt')
  });
}

function openSocket() {
  var socketUrl = new URL('https://newsapi.org/v2/top-headlines?apiKey=d34afe81451d4ade80d2916f2e9c019d&country=ng');
  socketUrl.protocol = 'wss';

  var ws = new WebSocket(socketUrl.href);

  //add listeners
  ws.addEventListener('message', function(event) {
    requestAnimationFrame(function() {
      onSocketMessage(event.data);
    });
  });

}

function onSocketMessage(data) {
  var messages = JSON.parse(data);
  console.log(messages);
}

//const dbpromise = openDatabase();
openSocket();


registerServiceWorker();
