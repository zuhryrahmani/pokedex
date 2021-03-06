// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroller';
import { Fab, Slide } from '@material-ui/core';
import { NavigationRounded } from '@material-ui/icons';
import { Skeleton } from '@material-ui/lab';

// components
import Container from '../../components/Container';
import Card from '../../components/ListCard';

// helpers
import formatName from '../../helpers/formatName';
import roundingNumber from '../../helpers/roundingNumber';

const Detail = () => {

  const breakpoints = [576, 768, 992, 1200];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const classes = {
    title: {
      color: '#F7B916',
      lineHeight: '50px',
      [mw[0]]: {
        fontSize: 24,
      }
    },
    info: {
      lineHeight: '50px',
      color: '#F7B916',
      textAlign: 'right',
      marginRight: 10,
      fontWeight: 300,
      [mw[0]]: {
        fontSize: 14,
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
    },
    count: {
      width: 50,
      height: 50,
      backgroundColor: '#2A3050',
      borderRadius: '50%',
      border: '3px solid #F7B916',
      lineHeight: '44px',
      textAlign: 'center',
      color: '#F7B916',
      fontWeight: 900,
      boxSizing: 'border-box',
      float: 'right',
      position: '-webkit-sticky',
      position: 'sticky',
      top: 20,
      zIndex: 1,
      boxShadow: '0 0 18px 8px rgba(0,0,0,0.2)'
    },
    fab: {
      '&.MuiButtonBase-root': {
        position: 'fixed',
        bottom: 110,
        right: 30,
        [mw[0]]: {
          bottom: 100,
          right: 20,
        }
      }
    },
    loading: {
      width: 'fit-content',
      paddingTop: 100,
      marginBottom: 5,
      boxSizing: 'border-box',
      [mw[0]]: {
        paddingTop: 60
      },
      '& .MuiSkeleton-root': {
        borderRadius: 25,
        [mw[0]]: {
          width: '130px !important',
          height: '110px !important',
        }
      },
    }
  };

  const history = useHistory();
  const [data, setData] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [scroll, setScroll] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const generateData = () => {
    axios.get(next)
      .then(res => {
        setData([...data, ...res.data.results]);
        setNext(res.data.next);
        setPrev(res.data.previous);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const clickPokemon = (id) => {
    history.push(`/detail/${id}`);
    document.scrollingElement.scrollTop = 0;
  };

  useEffect(() => {
    document.title = 'Pok??dex';
    axios.get('https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20')
      .then(res => {
        setData(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if(data.length > 898) {
      setData(data.filter((item,i) => i <= 897));
    };
  }, [data]);

  useEffect(() => {
    if(localStorage) {
      const storage = JSON.parse(localStorage.getItem('pokemon-list'));
      if(storage) {
        setCount(storage.length);
      };
    };
  }, [localStorage]);

  window.onscroll = () => {
    if(document.scrollingElement.scrollTop) {
      setScroll(document.scrollingElement.scrollTop);
    };
  };

  return (
    <Container>
      <div css={classes.count}>{count}</div>
      <div style={{display:'flex'}}>
        <div style={{width:'50%'}}>
          <h1 css={classes.title}>Pok??dex</h1>
        </div>
        <div style={{width:'50%'}}>
          <p css={classes.info}>You have caught</p>
        </div>
      </div>
      <div css={classes.list}>
        {loading ? (
          [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map(item => (
            <div css={classes.loading}>
              <Skeleton variant='react' width={240} height={155} animation='wave' />
            </div>
          ))
        ) : (
          data.map(item => (
            <Card
              name={formatName(item.name)}
              id={roundingNumber(item.url.slice(34, -1))}
              onClick={() => clickPokemon(item.name)}
            />
          ))
        )}
      </div>
      <InfiniteScroll
        initialLoad={false}
        loadMore={generateData}
        hasMore={data.length === 898 ? false : true}
        loader={
          <div css={classes.list} style={{paddingTop:0}}>
            {[1,2,3,4].map(item => (
              <div css={classes.loading}>
                <Skeleton variant='react' width={240} height={155} animation='wave' />
              </div>
            ))}
          </div>
        }
      />
      <Slide direction='up' in={scroll >= 100} mountOnEnter unmountOnExit>
        <Fab color='secondary' size='medium' css={classes.fab} onClick={() => document.scrollingElement.scrollTop = 0}>
          <NavigationRounded />
        </Fab>
      </Slide>
    </Container>
  );
};

export default Detail;