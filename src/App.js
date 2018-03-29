import React, { Component } from 'react';
import Header from './components/common/Header';
import Headlines from './containers/Headlines';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <main className="main">
          <Headlines />
        </main>
      </div>
    );
  }
}

export default App;
