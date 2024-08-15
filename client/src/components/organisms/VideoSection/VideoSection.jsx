import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import hero_reading from '../../../assets/images/hero_reading.png';
import play_button from '../../../assets/images/play-button.png';
import video_e_learning from '../../../assets/images/video-e-learning.mp4';
import './VideoSection.scss';

Modal.setAppElement('#root');

const VideoSection = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [modalIsOpen]);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  return (
    <div className="hero-section">
      <div className="content">
        <h1>Improve yourself to prepare for a better future.</h1>
        <p>
        Discover the joy of learning with our dynamic e-learning courses. Embrace new skills and knowledge at your convenience, from anywhere you choose!
        </p>
        <div className="actions">
          <button className="play-button" onClick={openModal}>
            <img src={play_button} alt="Play" className="play-icon" />
            Play video
          </button>
        </div>
      </div>
      <img src={hero_reading} alt="Hero Reading" className="hero-image" />

      {/* Modal for video */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        className="video-modal"
        overlayClassName="video-overlay"
      >
        <button onClick={closeModal} className="close-button">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 10.293l4.646-4.646 1.415 1.415L13.414 12l4.646 4.646-1.415 1.415L12 13.414l-4.646 4.646-1.415-1.415L10.586 12 5.94 7.354 7.355 5.939 12 10.293z"/>
          </svg>
        </button>
        <video controls autoPlay className="video-element">
          <source src={video_e_learning} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </div>
  );
};

export default VideoSection;