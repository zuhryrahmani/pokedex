// main
/** @jsxImportSource @emotion/react */
import React, { useState } from 'react';
import { jsx } from '@emotion/react';

// libraries
import { Modal, Grow } from '@material-ui/core';
import { CheckCircleOutlineRounded } from '@material-ui/icons';

// components
import Button from '../../Button';

const AddNameModal = ({open, onClose, onContinue, label, data}) => {

  const [name, setName] = useState('');
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);

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
      width: 400,
      borderRadius: 10,
      boxShadow: '0 0 18px 3px rgba(0,0,0,0.5)',
      margin: 'auto',
      textAlign: 'center',
      padding: 30,
      boxSizing: 'border-box',
      [mw[0]]: {
        width: 300
      }
    },
    check: {
      '&.MuiSvgIcon-root': {
        fontSize: 120,
        color: '#F7B916',
        marginBottom: 10
      }
    },
    input: {
      boxSizing: 'border-box',
      marginTop: 10,
      width: '100%',
      height: 36,
      border: 'none',
      outline: 'none',
      borderRadius: 8,
      textAlign: 'center',
      fontSize: 16,
      fontFamily: 'Lato, sans-serif',
      fontWeight: 900,
      position: 'relative',
      zIndex: 1
    },
    error: {
      fontSize: 12,
      color: '#FF6F6F',
      position: 'absolute',
      left: '50%',
      transform: 'translateX(-50%)',
      transition: '0.5s',
      display: 'inline-block',
      width: '100%'
    }
  };

  const handleCloseModal = () => {
    onClose();
    setTimeout(() => {
      setError1(false);
      setError2(false);
      setName('');
    }, 500);
  };

  const handleContinue = () => {
    if(name) {
      const obj = {
        name: name,
        species: data
      };
      let storage = JSON.parse(localStorage.getItem('pokemon-list'));
      if(storage) {
        if(storage.map(item => item.name).includes(name)) {
          setError1(false);
          setError2(true);
        } else {
          storage.push(obj);
          localStorage.setItem('pokemon-list', JSON.stringify(storage));
          setError1(false);
          setError2(false);
          handleCloseModal();
          setTimeout(() => {
            onContinue();
          }, 500);
        };
      } else {
        localStorage.setItem('pokemon-list', JSON.stringify([obj]));
        setError1(false);
        setError2(false);
        handleCloseModal();
        setTimeout(() => {
          onContinue();
        }, 500);
      };
    } else {
      setError1(true);
      setError2(false);
    };
  };

  return(
    <Modal
      open={open}
      css={classes.modal}
    >
      <Grow in={open}>
        <div css={classes.innerModal}>
          <CheckCircleOutlineRounded css={classes.check} />
          <p>You successfully captured this Pokémon, add a nickname to this <span style={{color:'#F7B916'}}>{label}</span>.</p>
          <input placeholder='Nickname...' value={name} onChange={e => setName(e.target.value)} type='text' css={classes.input} />
          <div style={{marginBottom:30, height:20, position:'relative'}}>
            <p css={classes.error} style={error1 ? {top:10, opacity:1} : {top:-30, opacity:0}}>You have to give it a nickname!</p>
            <p css={classes.error} style={error2 ? {top:10, opacity:1} : {top:-30, opacity:0}}>You already had this nickname, choose another!</p>
          </div>
          <Button
            label='Add to my pokémon list'
            style={{width:'100%'}}
            onClick={handleContinue}
          />
        </div>
      </Grow>
    </Modal>
  );
};

export default AddNameModal;