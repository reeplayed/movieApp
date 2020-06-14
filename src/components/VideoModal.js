import React, { Component } from 'react';
import { connect } from 'react-redux';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { setModalClose } from '../actions/movieActions';

const VideoModal = ({ setModalClose, movie: { modalVideo } }) => {
  return (
    <div className="video-modal-backdrop">
      <IconButton onClick={setModalClose}>
        <CloseIcon fontSize="large" color="secondary" />
      </IconButton>

      <div class="container">
        <iframe
          class="responsive-iframe"
          src={`https://www.youtube.com/embed/${modalVideo}`}
        ></iframe>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    movie: state.movie,
  };
}
export default connect(mapStateToProps, { setModalClose })(VideoModal);
