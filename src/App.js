import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Route exact path="/" component={ Login } />
        <Route exact path="/search" component={ Search } />
      </BrowserRouter>
    );
  }
}

export default App;
