// main
/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx } from '@emotion/react';

// components
import Button from '../Button';

const Card = ({name='Pokemon', id='001', onClick, style}) => {

  const breakpoints = [576, 768, 992, 1200];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const classes = {
    card: {
      width: 'fit-content',
      paddingTop: 100,
      marginBottom: 5,
      position: 'relative',
      boxSizing: 'border-box',
      display: 'block'
    },
    cardInfo: {
      width: 240,
      height: 270,
      backgroundColor: '#343E63',
      borderRadius: 25,
      paddingTop: 100,
      boxSizing: 'border-box',
      textAlign: 'center',
      position: 'relative'
    },
    img: {
      height: 200,
      width: 200,
      objectFit: 'cover',
      objectPosition: 'center',
      position: 'absolute',
      zIndex: 1,
      top: 0,
      left: '50%',
      transform: 'translateX(-50%)',
      filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.4))'
    },
    nameContainer: {
      display:'flex',
      justifyContent:'center',
      marginBottom: 20
    },
    name: {
      fontSize: 20,
      fontWeight: 400,
      fontWeight: 700,
      marginRight: 10
    },
    // id: {
    //   color: '#8e9ac4',
    //   fontSize: 14
    // },
    tags: {
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    tag: {
      width: 20,
      height: 20,
      borderRadius: '50%',
      fontSize: 14,
      fontWeight: 900,
      textAlign: 'center',
      lineHeight: '20px',
      display: 'inline-block',
      margin: '3px 3px',
      boxShadow: '0 0 10px 2px rgba(0,0,0,0.3)',
      color: 'rgba(0,0,0,0.6)',
      cursor: 'pointer'
    },
    title: {
      fontSize: 14,
      fontWeight: 300,
      marginBottom: 3
    },
    info: {
      color: '#F7B916'
    }
  };

  return(
    <div css={classes.card} onClick={onClick} style={style}>
      <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png`} alt='Bulbasaur' css={classes.img} />
      <div css={classes.cardInfo}>
        <div css={classes.nameContainer}>
          <div>
            <p css={classes.name}>Bulbasaur</p>
          </div>
          <div>
            <span css={classes.tag} style={{backgroundColor:'#9BCC50'}} title='Grass'>G</span>
            <span css={classes.tag} style={{backgroundColor:'#BA80CA'}} title='Poison'>P</span>
          </div>
        </div>
        
        {/* <p css={classes.id}>#001</p> */}
        {/* <div css={classes.tags}>
          <div css={classes.tag} style={{backgroundColor:'#9BCC50'}}>Grass</div>
          <div css={classes.tag} style={{backgroundColor:'#BA80CA'}}>Poison</div>
        </div> */}
        <div style={{display:'flex', marginBottom:15}}>
          <div style={{width:'50%'}}>
            <div css={classes.title}>Height</div>
            <div css={classes.info}>0.7 m</div>
          </div>
          <div style={{width:'50%'}}>
            <div css={classes.title}>Weight</div>
            <div css={classes.info}>6.9 kg</div>
          </div>
        </div>
        <div style={{display:'flex'}}>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.title}>HP</div>
            <div css={classes.info}>45</div>
          </div>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.title}>Attack</div>
            <div css={classes.info}>49</div>
          </div>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.title}>Defense</div>
            <div css={classes.info}>49</div>
          </div>
        </div>
        <Button
          label='Release'
          style={{
            padding: '4px 20px',
            borderRadius: 20,
            position: 'absolute',
            left: '50%',
            bottom: -16,
            transform: 'translateX(-50%)'
          }}
        />
      </div>
    </div>
  );
};

export default Card;