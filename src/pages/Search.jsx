import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from './Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  constructor() {
    super();

    this.state = {
      artistName: '',
      saveArtist: '',
      isDisabled: true,
      loading: false,
      artistAlbuns: [],
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
      this.setState({
        isDisabled: receiveBoll,
        saveArtist: value,
      });
    });
  }

  handleClick = () => {
    this.setState({
      artistName: '',
      loading: true,
    }, async () => {
      const { saveArtist } = this.state;
      const result = await searchAlbumsAPI(saveArtist);
      this.setState({
        artistAlbuns: result,
        loading: false,
      });
    });
  }

  render() {
    const {
      artistName,
      isDisabled,
      loading,
      artistAlbuns,
      saveArtist,
    } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
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
          onClick={ this.handleClick }
        >
          Pesquisar
        </button>
        {loading && <Loading />}
        {artistAlbuns.length > 0 ? (
          <div>
            <p>{ `Resultado de álbuns de: ${saveArtist}`}</p>
            {artistAlbuns.map((album, index) => (
              <div key={ index }>
                <img src={ album.artworkUrl100 } alt={ album.collectionName } />
                <span>{album.collectionName}</span>
                <span>{`Album price: ${album.collectionPrice}`}</span>
                <Link
                  to={ `/album/${album.collectionId}` }
                  data-testid={ `link-to-album-${album.collectionId}` }
                >
                  Link
                </Link>
              </div>
            ))}
          </div>
        )
          : <span>Nenhum álbum foi encontrado</span>}
      </div>
    );
  }
}

export default Search;
