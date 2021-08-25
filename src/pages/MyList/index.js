/* eslint-disable react-hooks/exhaustive-deps */
// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect, useContext } from 'react';
import { css, jsx } from '@emotion/react';
import axios from 'axios';
import { Hooks } from '../../providers';
import { Skeleton } from '@material-ui/lab';

// components
import Container from '../../components/Container';
import MyCard from '../../components/MyCard';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';

// assets
import pokemon from '../../assets/icons/pokemon-gray.svg';

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
      position: 'relative',
      margin: 'auto',
      height: 400,
      width: '100%',
      overflowY: 'hidden',
      overflowX: 'auto',
      scrollbarWidth: 'none',
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
    },
    icon: {
      position: 'absolute',
      left: '50%',
      top: '50%',
      transform: 'translate(-50%, -50%)',
      '& img': {
        width: 70,
        [mw[0]]: {
          width: 60
        }
      },
      '& .container': {
        width:'fit-content',
        position:'relative',
        margin: '0 auto'
      },
      '& .que': {
        position: 'absolute',
        right: 20,
        top: 0,
        color: '#95A8B1',
        fontSize: 20,
        fontWeight: 900,
        transform: 'rotate(10deg)',
        [mw[0]]: {
          right: 17,
          fontSize: 18
        }
      },
      '& p': {
        color: '#95A8B1',
        textAlign: 'center',
        [mw[0]]: {
          fontSize: 14
        }
      }
    },
    loading: {
      paddingTop: 100,
      '& .MuiSkeleton-root': {
        width: 240,
        height: 280,
        borderRadius: 25,
        [mh[0]]: {
          width: 190,
          height: 220
        }
      }
    }
  };

  const [owned, setOwned] = useState([]);
  const [species, setSpecies] = useState([]);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [chosenPokemon, setChosenPokemon] = useState('');
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
    if(species.length > 0) {
      setLoading(true);
      species.forEach((item, i) => {
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
          });
          if(i === species.length-1) {
            setLoading(false);
          };
          return;
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
      });
    };
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
            {loading ? [1,2,3,4,5,6,7,8,9,10].map((item, i) => (
                <div css={classes.loading} style={{margin:`0 20px 0 ${i===0 ? '20px' : 0}`}}>
                  <Skeleton variant='rect' animation='wave' />
                </div>
              )) : results.length > 0 ? results.map((item, i) => (
                <MyCard
                  data={item.data}
                  nickname={item.nickname}
                  style={{margin:`0 20px 0 ${i===0 ? '20px' : 0}`}}
                  handleRelease={() => {
                    setChosenPokemon(item);
                    setModal(true);
                  }}
                />
              )) : (
                <div css={classes.icon}>
                  <div className='container'>
                    <div className='que'>?</div>
                    <img src={pokemon} />
                  </div>
                  <p>you do not have any pokemon yet.</p>
                </div>
              )
            }
          </div>
        </div>
      </div>
      <ConfirmationModal
        open={modal}
        onClose={() => setModal(false)}
        onContinue={() => {
          handleRelease(chosenPokemon);
          setModal(false);
        }}
        name={chosenPokemon.nickname}
      />
    </div>
  );
};

export default MyList;