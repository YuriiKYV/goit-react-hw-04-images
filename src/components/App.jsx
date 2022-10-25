import { useState, useEffect } from 'react';
import axios from 'axios';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Searchbar from './Searchbar/Searchbar';
import Modal from './Modal/Modal';


export default function App() {

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [pages, setPages] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');


  useEffect(() => {
    if (!search) {
      return
    }
    fetchCards(search, page);

  }, [search, page])

  const fetchCards = (search, page) => {
    setLoading(true);

    axios
      .get(
        `https://pixabay.com/api/?q=${search}&page=${page}&key=29344802-8006fe240f1770c5a3ce0db85&image_type=photo&orientation=horizontal&per_page=12`
      )
      .then(({ data }) => {
        setItems((prev) => {
          return [...prev, ...data.hits]
        });
        setPages(data.hits.length);
      })
      .catch(error => {
        setError(error);
      })
      .finally(() => setLoading(false))
  }

  const LoadMore = () => {
    setPage(page => page + 1);
  }

  const onSearch = ({ search }) => {
    setSearch((prev) => {
      if (prev !== search) {
        setItems([]);
      }
      return search;
    });
    setPage(1);
  }

  const closeModal = () => {
    setModalOpen(false);
    setLargeImageURL('');
  }

  const openModal = (largeImageURL) => {
    setLargeImageURL(largeImageURL);
    setModalOpen(true);
  }


  const isCards = Boolean(items.length);


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