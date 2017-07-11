import React, { Component } from 'react';
import './App.css';

import Header from './Layout/Header';
import Footer from './Layout/Footer';
import Search from './Search/Search';

class App extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Search />
        <Footer />
      </div>
    );
  }
}

export default App;
