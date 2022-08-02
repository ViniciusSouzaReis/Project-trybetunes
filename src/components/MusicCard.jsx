import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from '../pages/Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      isChecked: false,
      loading: false,
    };
  }

  handleChange = () => {
    const { obj } = this.props;
    this.setState({
      isChecked: true,
      loading: true,
    }, async () => {
      await addSong(obj);
      this.setState({ loading: false });
    });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, isChecked } = this.state;
    return (
      loading ? <Loading />
        : (
          <div>
            <p>{trackName}</p>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              { `O seu navegador não suporta o elemento ${trackName}` }
              <code>audio</code>
            </audio>
            <label htmlFor="input-checkbox">
              Favorita
              <input
                type="checkbox"
                id="input-checkbox"
                name="trunfo"
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
                checked={ isChecked }
              />
            </label>
          </div>
        )
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  obj: PropTypes.shape({
    artistId: PropTypes.number.isRequired,
  }).isRequired,
};

export default MusicCard;
