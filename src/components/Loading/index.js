// main
/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { jsx } from '@emotion/react';
import { Modal, Grow } from '@material-ui/core';

// assets
import icon from '../../assets/icons/pokeball-yellow.svg';

const Loading = ({open, onClose}) => {


  const breakpoints = [576, 768, 992, 1200];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const classes = {
    modal: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 60
    },
    innerModal: {
      outline: 'none',
      textAlign: 'center',
      paddingTop: 100,
      '& img': {
        width: 100,
        position: 'absolute',
        bottom: 0,
        left: '50%',
        transform: 'translateX(-50%)'
      },
      '& p': {
        color: '#F7B916',
        fontSize: 20,
        animation: 'loadingText 1s infinite'
      }
    },
    loading: {
      position: 'relative',
      animation: 'loadingImg 1s infinite'
    }
  };

  return(
    <Modal
      open={open}
      css={classes.modal}
    >
      <Grow in={open}>
        <div css={classes.innerModal}>
          <div css={classes.loading}>
            <img src={icon} alt='Loading' />
          </div>
          <p>Capturing ...</p>
        </div>
      </Grow>
    </Modal>
  );
};

export default Loading;