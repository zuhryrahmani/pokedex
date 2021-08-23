// main
/** @jsxImportSource @emotion/react */
import React, { useEffect } from 'react';
import { jsx } from '@emotion/react';

// libraries
import { Modal, Grow } from '@material-ui/core';

const ResultModal = ({open, onClose, icon, desc }) => {


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
      backgroundColor: '#2A3050',
      borderRadius: '50%',
      boxShadow: '0 0 18px 3px rgba(0,0,0,0.5)',
      width: 200,
      height: 200,
      padding: '20px 10px 10px',
      boxSizing: 'border-box',
      '& .MuiSvgIcon-root': {
        fontSize: 100,
        color: '#F7B916',
        [mw[0]]: {
          fontSize: 60
        }
      },
      '& p': {
        fontSize: 16,
        color: '#F7B916',
        marginTop: -12,
        [mw[0]]: {
          fontSize: 12,
          marginTop: -5,
        }
      },
      [mw[0]]: {
        width: 150,
        height: 150,
      }
    }
  };

  useEffect(() => {
    if(open) {
      setTimeout(() => {
        onClose();
      }, 3000);
    };
  }, [open]);

  return(
    <Modal
      open={open}
      onClose={onClose}
      css={classes.modal}
    >
      <Grow in={open}>
        <div css={classes.innerModal}>
          {icon}
          <p css={classes.desc}>{desc}</p>
        </div>
      </Grow>
    </Modal>
  );
};

export default ResultModal;