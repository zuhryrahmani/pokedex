// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';

// components
import Card from '../components/ListCard';

// helpers
import toCapitalize from '../helpers/toCapitalize';
import roundingNumber from '../helpers/roundingNumber';

const Detail = () => {

  const breakpoints = [576, 768, 992, 1200];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const classes = {
    container: {
      width: 1000,
      margin: '0 auto',
      padding: '40px 0 150px',
      [mw[3]]: {
        width: 740
      },
      [mw[1]]: {
        width: 490
      },
      [mw[0]]: {
        width: '100%',
        padding: '20px 20px 150px',
      }
    },
    title: {
      color: '#F7B916',
      [mw[0]]: {
        fontSize: 24,
      }
    },
    list: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      paddingTop: 50,
      [mw[0]]: {
        justifyContent: 'space-around',
        paddingTop: 20
      }
    }
  };

  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  console.log('LOOK DATA', data);

  useEffect(() => {
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
      .then(res => {
        setData(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);
  console.log(roundingNumber)

  return (
    <div>
      <div css={classes.container}>
        <h1 css={classes.title}>Pokédex</h1>
        <div css={classes.list}>
          {data.map(item => (
            <Card
              name={toCapitalize(item.name)}
              id={roundingNumber(item.url.slice(34, -1))}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Detail;