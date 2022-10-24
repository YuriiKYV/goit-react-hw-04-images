import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import css from '../ImageGallery/ImageGallery.module.css';
import { PropTypes } from 'prop-types';


const ImageGallery = ({ items, onClick }) => {

  const elements = items.map(({ webformatURL, id, largeImageURL, tags }) =>
    <ImageGalleryItem
      webformatURL={webformatURL}
      onClick={onClick}
      largeImageURL={largeImageURL}
      key={id}
      tags={tags}
    />);
  return (
    <ul className={css.imageGallery}>
      {elements}
    </ul>
  );
};

export default ImageGallery;

ImageGallery.propTypes = {
  items: PropTypes.PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
};