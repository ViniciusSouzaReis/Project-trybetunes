import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import Search from './pages/Search';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      user: '',
      isDisable: true,
    };
  }

  checkButtonLength = () => {
    const { user } = this.state;
    const inputMinLength = 3;
    const checkLength = user.length < inputMinLength;
    return checkLength;
  }

  onInputChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const receiveBoll = this.checkButtonLength();
      this.setState({ isDisable: receiveBoll });
    });
  }

  render() {
    const { isDisable, user } = this.state;

    return (
      <BrowserRouter>
        <p>TrybeTunes</p>
        <Switch>
          <Route
            exact
            path="/"
            render={ (props) => (<Login
              { ...props }
              inputName={ user }
              checkName={ this.onInputChange }
              isDisabled={ isDisable }
            />) }
          />
          <Route exact path="/search" component={ Search } />
          <Route exact path="/album/:id" render={ (props) => <Album { ...props } /> } />
          <Route exact path="/favorites" component={ Favorites } />
          <Route exact path="/profile" component={ Profile } />
          <Route exact path="/profile/edit" component={ ProfileEdit } />
          <Route component={ NotFound } />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
