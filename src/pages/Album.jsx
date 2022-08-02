import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import MusicCard from '../components/MusicCard';

class Album extends React.Component {
  constructor() {
    super();

    this.state = {
      searchAlbum: [],
      searchArtistName: '',
      searchAlbumName: '',
    };
  }

  componentDidMount() {
    const { match: { params: { id } } } = this.props;
    this.setState({ searchAlbum: [] }, async () => {
      const result = await getMusics(id);
      this.setState({
        searchAlbum: result,
        searchArtistName: result[0].artistName,
        searchAlbumName: result[0].collectionName,
      });
    });
  }

  render() {
    const { searchArtistName, searchAlbumName, searchAlbum } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <span data-testid="artist-name">{searchArtistName}</span>
        <span data-testid="album-name">{searchAlbumName}</span>
        {searchAlbum.map((music, index) => index !== 0 && (
          <MusicCard
            key={ index }
            trackName={ music.trackName }
            previewUrl={ music.previewUrl }
            trackId={ music.trackId }
            obj={ music }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

export default Album;
