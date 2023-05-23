import { useState, useEffect } from 'react';
import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import { fetchImages } from '../../services/images-api';
import css from './ImageGallery.module.css';
import ErrorGaleryImages from 'components/errorGaleryImages/ErrorGaleryImages';
import {Loader} from 'components/loader/Loader';
import { Button } from 'components/button/Button';
import { Modal } from 'components/modal/Modal';

export const ImageGallery = ({ imageName }) => {
  const [images, setImages] = useState([]);
  const [totalHits, setTotalHits] = useState(null);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [modalImgUrl, setModalImgUrl] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!imageName) {
      return;
    }

    setPage(1);
    setStatus('pending');

    fetchImages(imageName, 1)
      .then(images => {
        setImages(images.hits);
        setTotalHits(images.totalHits);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [imageName]);

  const handleClickLoadMore = async () => {
    setPage(page + 1);
    setIsLoading(true);

    await fetchImages(imageName, page + 1)
      .then(nextImages => {
        setImages([...images, ...nextImages.hits]);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

  const handleOpenModal = e => {
    setShowModal(true);
    setModalImgUrl(e.target.id);
    setModalAlt(e.target.alt);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setModalImgUrl('');
    setModalAlt('');
  };

  if (status === 'pending') {
    return <Loader />;
  }

  if (status === 'rejected') {
    return <ErrorGaleryImages message={error.message} />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ul className={css.image_gallery}>
          {images &&
            images.map(({ webformatURL, tags, largeImageURL }) => (
              <ImageGalleryItem
                key={webformatURL}
                smallImgUrl={webformatURL}
                tag={tags}
                bigImgUrl={largeImageURL}
                onClick={handleOpenModal}
              />
            ))}
        </ul>
        {images.length < totalHits && <Button onClick={handleClickLoadMore} />}

        {showModal && (
          <Modal onClose={handleCloseModal}>
            <img src={modalImgUrl} alt={modalAlt} />
          </Modal>
        )}

        {isLoading && (<Loader />)}
      </>
    );
  }
};
