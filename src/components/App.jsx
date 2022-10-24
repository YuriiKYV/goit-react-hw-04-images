import { Component } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';

export default class App extends Component {
  state = {
    items: [],
    loading: false,
    error: null,
    page: 1,
    search: '',
    pages: 0,
    modalOpen: false,
    largeImageURL: '',
  };

  componentDidMount() {
  }

  componentDidUpdate(_, prevState) {
    const { page, search } = this.state;
    if ((search && prevState.search !== search) || page > prevState.page) {
      this.fetchCards(search, page)
    }
    if (search && prevState.search !== search) {
      this.setState({
        items: [],
      })
    }
  }

  fetchCards(search) {
    const { page } = this.state;
    this.setState({
      loading: true,
    });

    axios
      .get(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=29344802-8006fe240f1770c5a3ce0db85&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(({ data }) => {
        this.setState(({ items, pages }) => {

          return {
            items: [...items, ...data.hits],
            pages: data.hits.length,
          };
        });
      })
      .catch(error => {
        this.setState({
          error,
        });
      })
      .finally(() => this.setState({ loading: false, }));
  }

  LoadMore = () => {
    this.setState(({ page }) => {
      return {
        page: page + 1,
      };
    });
  };

  onSearch = ({ search }) => {
    this.setState({
      search: search,
    })
  }

  closeModal = () => {
    this.setState({
      modalOpen: false,
      modalImage: '',
    })
  }

  openModal = (largeImageURL) => {
    this.setState({
      modalOpen: true,
      largeImageURL,
    })
  }

  render() {
    const { items, loading, error, pages, modalOpen, largeImageURL } = this.state;
    const isCards = Boolean(items.length);
    const { LoadMore, onSearch, closeModal, openModal } = this;

    return (
      <div className="App">
        {modalOpen && <Modal onClose={closeModal} largeImageURL={largeImageURL}></Modal>}
        <Searchbar onSubmit={onSearch} />
        {loading && <Loader />}
        {error && <p>Спробуйте будь-ласка пізніше</p>}
        {isCards && <ImageGallery items={items} onClick={openModal} />}
        {isCards && < Button LoadMore={LoadMore} pages={pages} />}
      </div>
    );
  }
}
