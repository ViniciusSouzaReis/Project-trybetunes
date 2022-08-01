import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      savedName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async() => {
      const result = await getUser();
      const { name } = result;
      this.setState({
        loading: false,
        savedName: name,
      });
    });
  }

  render() {
    const { savedName, loading } = this.state;
    return (
      loading ? <Loading />
        : (
          <header data-testid="header-component">
            <span data-testid="header-user-name">{savedName}</span>
          </header>
        )
    );
  }
}

export default Header;
