import css from '../ImageGalleryItem/ImageGalleryItem.module.css';
import { PropTypes } from 'prop-types';

export default function ImageGalleryItem({ webformatURL, onClick, largeImageURL, tags }) {

  return (
    <li className={css.imageGalleryItem} onClick={() => onClick(largeImageURL)}>
      <img className={css.imageGalleryItemImage} src={webformatURL} alt={tags} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};