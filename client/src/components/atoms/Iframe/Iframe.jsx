import React from 'react';
import PropTypes from 'prop-types';
import styles from './iframe.scss';

const Iframe = ({ youtubeLink }) => {
  const isValidYoutubeLink = (link) => {
    const regex = /^(https?\:\/\/)?(www\.youtube\.com|youtu\.?be)\/(watch\?v=|embed\/|v\/|.+\?v=)?([^#&?]*).*/;
    return regex.test(link);
  };

  const getYoutubeVideoId = (link) => {
    const regex = /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
  };

  if (!isValidYoutubeLink(youtubeLink)) {
    return <div className={styles.error}>Invalid YouTube link</div>;
  }

  const videoId = getYoutubeVideoId(youtubeLink);

  if (!videoId) {
    return <div className={styles.error}>Invalid YouTube link</div>;
  }

  return (
    <div className={styles.iframeContainer}>
      <iframe
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}`}
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      ></iframe>

    { /*
    return
    <div>
      <h1>My YouTube Video</h1>
      <Iframe youtubeLink="https://www.youtube.com/watch?v=qD--21GnB8U" />
    </div> */}
    </div>
  );
};

Iframe.propTypes = {
  youtubeLink: PropTypes.string.isRequired,
};

export default Iframe;
