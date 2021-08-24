/* eslint-disable react-hooks/exhaustive-deps */
// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import { Hooks } from '../../providers';

// components
import Container from '../../components/Container';
import MyCard from '../../components/MyCard';

const MyList = () => {

  const breakpoints = [576, 768, 992, 1200];
  const breakpointsHeight = [610];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const mh = breakpointsHeight.map(bp => `@media (max-height: ${bp}px)`);
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
    desc: {
      marginBottom: 10,
      [mw[0]]: {
        fontSize: 14
      }
    },
    container: {
      flex: 'auto',
      display: 'flex'
    },
    center: {
      margin: 'auto',
      height: 400,
      width: '100%',
      overflowY: 'hidden',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none'
      },
      [mh[0]]: {
        height: 340
      }
    },
    scroll: {
      height: '100%',
      width: 'fit-content',
      display: 'flex'
    }
  };

  const [owned, setOwned] = useState([]);
  const [species, setSpecies] = useState([]);
  const [results, setResults] = useState([]);
  const {data, setData} = useContext(Hooks);

  const handleRelease = (item) => {
    const newArr = owned.filter(data => data.name !== item.nickname);
    const newSet = new Set(newArr.map(data => data.species));
    setOwned(newArr);
    setSpecies([...newSet]);
    setData(data.filter(int => int.name !== item.nickname));
    localStorage.setItem('pokemon-list', JSON.stringify(newArr));
  }

  useEffect(() => {
    if(localStorage) {
      const storage = JSON.parse(localStorage.getItem('pokemon-list'));
      if(storage) {
        setOwned(storage);
        const newSet = new Set(storage.map(item => item.species));
        setSpecies([...newSet]);
      };
    };
  }, [localStorage]);


  useEffect( async () => {
    species.length > 0 && species.forEach((item, i) => {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${item}`)
      .then(res => {
        setData(oldArr => {
          const arr = [];
          oldArr.map(item => {
            if(item.name !== res.data.name) {
              arr.push(item);
            };
          });
          return [...arr, res.data];
        })
        return
      })
      .catch(err => {
        console.log(err);
      });
    });
  }, [species]);

  useEffect(() => {
    if(owned && species && data.length > 0) {
      const arr = owned.map(item => {
        let obj;
        data.map(int => {
          if(item.species === int.name) {
            obj = {
              nickname: item.name,
              data: int
            };
          };
        });
        return obj;
      });
      setResults(arr.filter(item => item));
    };
  }, [owned, data]);

  return (
    <div css={classes.outerContainer}>
      <Container style={{paddingBottom:0, display:'flex', flexDirection:'column'}}>
        <h1 css={classes.title}>My Pokémon List</h1>
        <p css={classes.desc}>You have captured <span style={{color:'#F7B916'}}>{owned.length}</span> pokémons in total. While there are 898 pokémon species out in the wild, you have caught <span style={{color:'#F7B916'}}>{species.length}</span> of them.</p>
      </Container>
      <div css={classes.container}>
        <div css={classes.center}>
          <div css={classes.scroll}>
            {results.map((item, i) => (
              <MyCard
                data={item.data}
                nickname={item.nickname}
                style={{margin:`0 20px 0 ${i===0 ? '20px' : 0}`}}
                handleRelease={() => handleRelease(item)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyList;