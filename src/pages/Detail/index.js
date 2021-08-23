// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import { Button, Slide } from '@material-ui/core';
import { KeyboardBackspaceRounded, CheckRounded, ClearRounded } from '@material-ui/icons';
import axios from 'axios';

// components
import Container from '../../components/Container';
import Tags from '../../components/Tags';
import AddNameModal from '../../components/Modals/AddNameModal';
import ResultModal from '../../components/Modals/ResultModal';

// helpers
import formatName from '../../helpers/formatName';
import roundingNumber from '../../helpers/roundingNumber';

const Detail = () => {

  const { id } = useParams();
  const history = useHistory();
  const location = useLocation();

  const [data, setData] = useState(null);
  const [types, setTypes] = useState([]);
  const [moves, setMoves] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [nameModal, setNameModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);
  const [failModal, setFailModal] = useState(false);
  const [result, setResult] = useState(null);

  const breakpoints = [576, 768, 992, 1200];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const classes = {
    back: {
      cursor: 'pointer',
      display: 'flex',
      marginBottom: 20,
      '& .MuiSvgIcon-root': {
        fontSize: 40,
        [mw[0]]: {
          fontSize: 30
        }
      },
      [mw[0]]: {
        marginBottom: 5
      }
    },
    backInfo: {
      lineHeight: '40px',
      opacity: 0.6,
      marginLeft: 5,
      fontWeight: 300,
      [mw[0]]: {
        lineHeight: '30px'
      }
    },
    name: {
      fontSize: 40,
      fontWeight: 600,
      color: '#F7B916',
      [mw[0]]: {
        fontSize: 34
      }
    },
    id: {
      fontSize: 20,
      position: 'absolute',
      bottom: 4,
      right: 0,
      [mw[0]]: {
        fontSize: 16
      }
    },
    img: {
      textAlign: 'center',
      position: 'relative',
      marginBottom: 50,
      '& img': {
        width: 475,
        height: 475,
        objectFit: 'cover',
        objectPosition: 'center',
        filter: 'drop-shadow(5px 12px 15px rgba(0,0,0,0.5))',
        [mw[1]]: {
          width: 400,
          height: 400,
        },
        [mw[0]]: {
          width: 300,
          height: 300,
        }
      },
      [mw[0]]: {
        marginBottom: 25
      }
    },
    nameImg: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 120,
      fontWeight: 900,
      color: '#343E63',
      [mw[1]]: {
        fontSize: 75
      },
      [mw[0]]: {
        fontSize: 55
      }
    },
    infoContainer: {
      display: 'flex',
      [mw[0]]: {
        display: 'block'
      }
    },
    left: {
      width: '45%',
      borderRight: '1px solid #EFF2FC',
      display: 'flex',
      justifyContent: types.length < 2 ? 'center' : 'space-between',
      alignItems: 'center',
      paddingRight: types.length < 2 ? 0 : 70,
      boxSizing: 'border-box',
      [mw[3]]: {
        paddingRight: types.length < 2 ? 0 : 40,
      },
      [mw[1]]: {
        paddingRight: types.length < 2 ? 0 : 20,
      },
      [mw[0]]: {
        width: '100%',
        borderRight: 'none',
        marginBottom: 30,
        justifyContent: types.length < 2 ? 'center' : 'space-around',
        paddingRight: 0,
      }
    },
    right: {
      width: '55%',
      display: 'flex',
      textAlign: 'center',
      [mw[0]]: {
        width: '100%'
      }
    },
    infoTitle: {
      marginBottom: 8,
      fontWeight: 300,
      [mw[0]]: {
        fontSize: 12
      }
    },
    info: {
      fontSize: 20,
      color: '#F7B916',
      [mw[0]]: {
        fontSize: 16
      }
    },
    moves: {
      marginTop: 50,
      [mw[0]]: {
        marginTop: 40
      }
    },
    movesTitle: {
      fontWeight: 300,
      fontSize: 20,
      [mw[0]]: {
        fontSize: 16,
        textAlign: 'center'
      }
    },
    tags: {
      marginTop: 15,
      display: 'flex',
      flexWrap: 'wrap',
      [mw[0]]: {
        justifyContent: 'center'
      }
    },
    tag: {
      backgroundColor: '#343E63',
      borderRadius: 20,
      padding: '6px 24px',
      width: 'fit-content',
      margin: '0 10px 10px 0',
      color: '#F7B916',
      [mw[0]]: {
        fontSize: 12,
        margin: 5,
      }
    },
    tagClick: {
      backgroundColor: '#343E63',
      borderRadius: 20,
      padding: '6px 24px',
      width: 'fit-content',
      margin: '0 10px 10px 0',
      color: '#F7B916',
      cursor: 'pointer',
      '&:hover': {
        opacity: '0.7'
      },
      [mw[0]]: {
        fontSize: 12
      }
    },
    capture: {
      '&.MuiButtonBase-root': {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 60,
        display: 'block',
        width: '100%',
        zIndex: 2,
        fontWeight: 900,
        fontSize: 28,
        boxShadow: '0 -5px 20px 0 rgba(0,0,0,0.3)',
        borderRadius: '25px 25px 0 0',
        '&.Mui-disabled': {
          backgroundColor: 'rgba(0, 0, 0, 0.12)'
        },
        [mw[0]]: {
          fontSize: 20
        }
      }
    }
  };

  const handleCapture = () => {
    setResult(Math.random());
  };

  useEffect(() => {
    if(id) {
      document.title = `${formatName(id)} | Pokédex`;
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => {
          setData(res.data);
          setTypes(res.data.types.map(item => item.type.name));
          setMoves(res.data.moves.map(item => item.move.name));
        })
        .catch(err => {
          console.log(err);
        });
    };
  }, [id]);

  useEffect(() => {
    if(typeof result === 'number') {
      if(result > 0.5) {
        setNameModal(true);
      } else {
        setFailModal(true);
      };
    };
  }, [result]);

  return (
    <Container style={{position:'relative', zIndex:1}}>
      <div onClick={() => history.push('/pokedex')} css={classes.back}>
        <KeyboardBackspaceRounded />
        <div css={classes.backInfo}>Pokédex</div>
      </div>
      <div style={{position:'relative'}}>
        <div css={classes.name}>{data && formatName(data.name)}</div>
        <div css={classes.id}>#{data && roundingNumber(data.id)}</div>
      </div>
      <div css={classes.img}>
        <div css={classes.nameImg}>{data && data.name.toUpperCase()}</div>
        <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${data && roundingNumber(data.id)}.png`} alt={data && formatName(data.name)}/>
      </div>
      <div css={classes.infoContainer}>
        <div css={classes.left}>
          {types.map(item => <Tags type={item} />)}
        </div>
        <div css={classes.right}>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.infoTitle}>Height</div>
            <div css={classes.info}>{data && data.height/10} m</div>
          </div>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.infoTitle}>Weight</div>
            <div css={classes.info}>{data && data.weight/10} kg</div>
          </div>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.infoTitle}>Abilities</div>
            <div css={classes.info}>{data && formatName(data.abilities[0].ability.name)}</div>
          </div>
        </div>
      </div>
      <div css={classes.moves}>
        <div css={classes.movesTitle}>Moves</div>
        <div css={classes.tags}>
          {readMore ? moves.map(item => <div css={classes.tag}>{formatName(item)}</div>) : moves.slice(0,20).map(item => <div css={classes.tag}>{formatName(item)}</div>)}
          {!readMore && moves.length > 20 && <div css={classes.tagClick} title='Read More' onClick={() => setReadMore(true)}>...</div>}
        </div>
      </div>
      <Slide direction='up' in={location.pathname.includes('/detail')}>
        <Button
          css={classes.capture}
          color='secondary'
          variant='contained'
          onClick={handleCapture}
          // disabled
        >
          CAPTURE
        </Button>
      </Slide>
      <AddNameModal
        label={formatName(id)}
        open={nameModal}
        onClose={() => setNameModal(false)}
        onContinue={() => setSuccessModal(true)}
        data={id}
      />
      <ResultModal
        icon={<CheckRounded />}
        desc='Succeed add this pokémon to your list.'
        open={successModal}
        onClose={() => {
          setSuccessModal(false);
          setResult(null);
        }}
      />
      <ResultModal
        icon={<ClearRounded />}
        desc='Failed to capture this pokémon.'
        open={failModal}
        onClose={() => {
          setFailModal(false);
          setResult(null);
        }}
      />
    </Container>
  );
};

export default Detail;