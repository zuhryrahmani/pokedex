// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import axios from 'axios';

// components
import Container from '../../components/Container';
import MyCard from '../../components/MyCard';

const MyList = () => {

  const breakpoints = [576, 768, 992, 1200];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const classes = {
    outerContainer: {
      display:'flex',
      flexDirection:'column',
      height:'100vh',
      paddingBottom: 80,
      boxSizing: 'border-box'
    },
    title: {
      color: '#F7B916',
      lineHeight: '50px',
      [mw[0]]: {
        fontSize: 24,
      }
    },
    container: {
      border: '1px solid red',
      flex: 'auto',
      display: 'flex'
    },
    center: {
      border: '1px solid red',
      margin: 'auto',
      height: 390,
      width: '100%',
      overflowY: 'hidden',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      }
    },
    scroll: {
      height: '100%',
      width: 'fit-content',
      display: 'flex'
    }
  };

  const [owned, setOwned] = useState([]);
  const [species, setSpecies] = useState(0);

  useEffect(() => {
    if(localStorage) {
      const storage = JSON.parse(localStorage.getItem('pokemon-list'));
      setOwned(storage);
      const newSet = new Set(storage.map(item => item.species));
      setSpecies([...newSet].length);
    };
  }, [localStorage]);

  return (
    <div css={classes.outerContainer}>
      <Container style={{paddingBottom:0, display:'flex', flexDirection:'column'}}>
        <h1 css={classes.title}>My Pokémon List</h1>
        <p style={{marginBottom:10}}>You have captured <span style={{color:'#F7B916'}}>{owned.length}</span> pokémons in total. While there are 898 pokémon species out in the wild, you have caught <span style={{color:'#F7B916'}}>{species}</span> of them.</p>
      </Container>
      <div css={classes.container}>
        <div css={classes.center}>
          <div css={classes.scroll}>
            {[0,1,2,3,4,5,6,7,8,9].map((item, i) => <MyCard style={{margin:`0 20px 0 ${i===0 ? '20px' : 0}`}} />)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyList;