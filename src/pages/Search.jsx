import React from 'react';
import Header from '../components/Header';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      isDisabled: true,
    };
  }

  checkNameLength = () => {
    const { artistName } = this.state;
    const inputMinLength = 2;
    const checkLength = artistName.length < inputMinLength;
    return checkLength;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value }, () => {
      const receiveBoll = this.checkNameLength();
      this.setState({ isDisabled: receiveBoll });
    });
  }

  render() {
    const { artistName, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <input
            type="text"
            data-testid="search-artist-input"
            name="artistName"
            value={ artistName }
            onChange={ this.handleChange }
          />
          <button
            type="button"
            data-testid="search-artist-button"
            disabled={ isDisabled }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
