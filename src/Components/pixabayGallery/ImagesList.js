import { useState, useEffect } from 'react';
//toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//loader
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import Loader from 'react-loader-spinner';
//gallery ul
import ImageGallery from '../ImageGallery';
//gallery li
import ImageGalleryItem from '../ImageGalleryItem';
//api
import { PixabayFetch } from '../../service/pixabay';
//btn
import Button from '../Button';
//modal
import Modal from '../Modal';
import PropTypes from 'prop-types';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '23189092-912e167e41c5e7d499821c37e';
const newPixabayFetch = new PixabayFetch(BASE_URL, API_KEY);

export default function ImagesList({ searchValue }) {
  const [searchResults, setSearchResults] = useState([]);
  const [status, setStatus] = useState('idle');
  const [largeImageId, setLargeImageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!searchValue) return;
    setStatus('pending');
    toast.info('Enter other data or check the word for mistakes', {
      autoClose: 3000,
      position: 'top-center',
    });

    newPixabayFetch.resetPage();
    newPixabayFetch.searchQuery = searchValue;
    newPixabayFetch
      .searchPhotos()
      .then(searchResults => {
        setStatus('resolved');
        setSearchResults(searchResults);
      })
      .catch(err => {
        console.log(err);
        toast.warn('Uppps, error');
        setStatus('rejected');
      });
  }, [searchValue]);
  const handleClick = () => {
    newPixabayFetch.page = 1;
    newPixabayFetch
      .searchPhotos()
      .then(searchResults => {
        setSearchResults(prev => [...prev, ...searchResults]);
        setStatus('resolved');
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      })
      .catch(err => {
        console.log(err);
        setStatus('rejected');
      });
  };

  const findImg = () => {
    const largeImg = searchResults.find(searchResults => {
      return searchResults.id === largeImageId;
    });
    return largeImg;
  };
  const openModal = e => {
    setIsModalOpen(true);
    setLargeImageId(Number(e.currentTarget.id));
  };
  const closeModal = () => setIsModalOpen(false);
  const paramLoadMore = searchResults.length > 0 && searchResults.length >= 12;
  if (status === 'idle') {
    return (
      <div className="container-title">
        <p>You can find any pictures, photos and images here</p>
      </div>
    );
  }
  if (status === 'pending') {
    return (
      <div className="loader">
        <Loader
          type="MutatingDots"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000}
        />
      </div>
    );
  }
  if (status === 'rejected') {
    return (
      <div className="container-title">
        <p>Uppps, error</p>
      </div>
    );
  }
  if (status === 'resolved') {
    return (
      <>
        <ImageGallery>
          {searchResults.length > 0 && (
            <ImageGalleryItem
              openModal={openModal}
              searchResults={searchResults}
            />
          )}
        </ImageGallery>
        {paramLoadMore > 0 && <Button onClick={handleClick} />}
        {searchResults.length === 0 && (
          <>
            <div className="container-title">
              <p>Sorry, we did not find this</p>
            </div>
            <ToastContainer />
          </>
        )}
        {isModalOpen && (
          <Modal largeImageId={largeImageId} onClose={closeModal}>
            <img src={findImg().largeImageURL} alt={findImg().tags} />
          </Modal>
        )}
      </>
    );
  }
}

ImagesList.propTypes = {
  searchValue: PropTypes.string.isRequired,
};
