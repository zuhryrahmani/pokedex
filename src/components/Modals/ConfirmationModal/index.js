// main
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';

// libraries
import { Modal, Grow } from '@material-ui/core';

// components
import Button from '../../Button';

const AddNameModal = ({open, onClose, onContinue, name}) => {

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
      backgroundColor: '#2A3050',
      width: 350,
      borderRadius: 10,
      boxShadow: '0 0 18px 3px rgba(0,0,0,0.5)',
      margin: 'auto',
      padding: 30,
      boxSizing: 'border-box',
      [mw[0]]: {
        width: 300
      }
    }
  };

  return(
    <Modal
      open={open}
      css={classes.modal}
    >
      <Grow in={open}>
        <div css={classes.innerModal}>
          <p style={{textAlign:'center'}}>Are you sure you want to release <span style={{color:'#F7B916'}}>{name}</span> ?</p>
          <div style={{marginTop:30}}>
            <Button
              label='No'
              style={{width:'100px'}}
              onClick={onClose}
            />
            <Button
              label='Yes'
              style={{width:'100px', float:'right'}}
              onClick={onContinue}
            />
          </div>
        </div>
      </Grow>
    </Modal>
  );
};

export default AddNameModal;