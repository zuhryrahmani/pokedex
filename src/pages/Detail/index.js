// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { css, jsx } from '@emotion/react';
import { KeyboardBackspaceRounded } from '@material-ui/icons';
import axios from 'axios';

// components
import Container from '../../components/Container';
import Tags from '../../components/Tags';

// helpers
import formatName from '../../helpers/formatName';
import roundingNumber from '../../helpers/roundingNumber';
import typeColor from '../../helpers/typeColor';

const Detail = () => {

  const { id } = useParams();
  const history = useHistory();

  const [data, setData] = useState(null);
  const [types, setTypes] = useState([]);
  console.log('LOOK DATA', data);
  console.log('LOOK TYPES', types);

  const classes = {
    back: {
      cursor: 'pointer',
      display: 'flex',
      marginBottom: 20
    },
    backInfo: {
      lineHeight: '40px',
      opacity: 0.6,
      marginLeft: 5,
      fontWeight: 300
    },
    name: {
      fontSize: 40,
      fontWeight: 600
    },
    id: {
      fontSize: 20,
      position: 'absolute',
      bottom: 0,
      right: 0
    },
    // backdrop: {
    //   position: 'absolute',
    //   top: 0,
    //   left: 0,
    //   right: 0,
    //   height: 250
    // },
    img: {
      textAlign: 'center',
      position: 'relative',
      marginBottom: 50,
      '& img': {
        width: 475,
        height: 475,
        objectFit: 'cover',
        objectPosition: 'center',
        filter: 'drop-shadow(5px 12px 15px rgba(0,0,0,0.5))'
      }
    },
    nameImg: {
      position: 'absolute',
      bottom: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      fontSize: 120,
      fontWeight: 900,
      opacity: 0.1
    },
    left: {
      width: '45%',
      borderRight: '1px solid #EFF2FC',
      display: 'flex',
      justifyContent: types.length < 2 ? 'center' : 'space-between',
      alignItems: 'center',
      paddingRight: types.length < 2 ? 0 : 70,
      boxSizing: 'border-box'
    },
    right: {
      width: '55%',
      display: 'flex',
      textAlign: 'center'
    },
    infoTitle: {
      marginBottom: 8,
      fontWeight: 300
    },
    info: {
      fontSize: 20,
      color: '#F7B916'
    }
  };

  useEffect(() => {
    if(id) {
      axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => {
          setData(res.data);
          setTypes(res.data.types.map(item => item.type.name));
        })
        .catch(err => {
          console.log(err);
        });
    };
  }, [id]);

  return (
    <Container style={{position:'relative', zIndex:1}}>
      <div onClick={() => history.push('/pokedex')} css={classes.back}>
        <KeyboardBackspaceRounded style={{fontSize:40}}/>
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
      <div style={{display:'flex'}}>
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
      <div style={{marginTop:50}}>
        <div style={{fontSize:20}}>Moves</div>
      </div>
    </Container>
  );
};

export default Detail;