import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import idb from 'idb';
import Headlines from './containers/Headlines';

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
  socketUrl.protocol = 'ws';

  var ws = new WebSocket(socketUrl.href);

  //add listeners
  ws.addEventListener('message', function(event) {
    requestAnimationFrame(function() {
      onSocketMessage(event.data);
    });
  });

}

function showCachedMessages() {
  return dbpromise.then(function(db) {
    if(!db || Headlines.hasHeadlines) return;
  

  var index = db.transaction('headlines')
    .objectStore('headlines').index('by-date');
  
    return index.getAll().then(function(messages) {
      Headlines.updateArticlesFromDb(messages.reverse());
    });
  });
}

function onSocketMessage(data) {
  var messages = JSON.parse(data).articles;
  console.log(messages);
  dbpromise.then(function(db) {
    if(!db) return;

    var tx = db.transaction('headlines','readwrite');
    var store = tx.objectStore('headlines');
    messages.forEach(function(message) {
      store.put(message);
    });

    //limit store to 30 items
    store.index('by-date').openCursor(null, "prev").then(function(cursor) {
      return cursor.advance(30);
    }).then(function deleteRest(cursor) {
      if (!cursor) return;
      cursor.delete();
      return cursor.continue().then(deleteRest);
    });
  });
}

const dbpromise = openDatabase();
registerServiceWorker();
showCachedMessages().then(function() {
  openSocket();
});
