import css from '../Button/Button.module.css';
import { PropTypes } from 'prop-types';

export default function Button({ LoadMore, pages }) {
  if (pages <= 11) {
    return
  }

  return (
    <button onClick={LoadMore} className={css.Button}>
      Load more
    </button>
  );
}

Button.propTypes = {
  pages: PropTypes.PropTypes.number.isRequired,
  LoadMore: PropTypes.func.isRequired,
};
