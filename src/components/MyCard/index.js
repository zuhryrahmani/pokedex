// main
/** @jsxImportSource @emotion/react */
import React from 'react';
import { jsx } from '@emotion/react';

// components
import Button from '../Button';

// helpers
import roundingNumber from '../../helpers/roundingNumber';
import formatName from '../../helpers/formatName';
import typeColor from '../../helpers/typeColor';

const Card = ({nickname, data, onClick, style, handleRelease}) => {

  const breakpoints = [576, 768, 992, 1200];
  const breakpointsHeight = [610];
  const mw = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const mh = breakpointsHeight.map(bp => `@media (max-height: ${bp}px)`);
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
      height: 280,
      backgroundColor: '#343E63',
      borderRadius: 25,
      paddingTop: 100,
      boxSizing: 'border-box',
      textAlign: 'center',
      position: 'relative',
      [mh[0]]: {
        width: 190,
        height: 220,
        paddingTop: 60
      }
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
      filter: 'drop-shadow(5px 10px 10px rgba(0,0,0,0.4))',
      [mh[0]]: {
        width: 160,
        height: 160
      }
    },
    nickname: {
      fontSize: 20,
      fontWeight: 700,
      marginBottom: 10,
      color: '#F7B916',
      [mh[0]]: {
        fontSize: 16
      }
    },
    nameContainer: {
      display:'flex',
      justifyContent:'center',
      marginBottom: 10
    },
    name: {
      fontSize: 16,
      marginRight: 10,
      [mh[0]]: {
        fontSize: 14,
        marginTop: 2
      }
    },
    tags: {
      display: 'flex',
      justifyContent: 'space-evenly'
    },
    tag: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      fontSize: 12,
      fontWeight: 900,
      textAlign: 'center',
      lineHeight: '16px',
      display: 'inline-block',
      margin: '3px 3px',
      boxShadow: '0 0 10px 2px rgba(0,0,0,0.3)',
      color: 'rgba(0,0,0,0.6)',
      cursor: 'pointer',
      [mh[0]]: {
        width: 14,
        height: 14,
        fontSize: 10,
        lineHeight: '14px',
        margin: '0 3px 0'
      }
    },
    title: {
      fontSize: 14,
      fontWeight: 300,
      marginBottom: 3,
      [mh[0]]: {
        fontSize: 12
      }
    },
    info: {
      color: '#F7B916',
      [mh[0]]: {
        fontSize: 14
      }
    }
  };

  return(
    <div css={classes.card} onClick={onClick} style={style}>
      <img src={`https://assets.pokemon.com/assets/cms2/img/pokedex/full/${roundingNumber(data && data.id)}.png`} alt='Bulbasaur' css={classes.img} />
      <div css={classes.cardInfo}>
        <div css={classes.nickname}>{nickname}</div>
        <div css={classes.nameContainer}>
          <div>
            <p css={classes.name}>{data && formatName(data.name)}</p>
          </div>
          <div>
            {data && data.types.map(item => <span css={classes.tag} style={{backgroundColor:typeColor(item.type.name)}} title={formatName(item.type.name)}>{formatName(item.type.name)[0]}</span>)}
          </div>
        </div>
        <div style={{display:'flex', marginBottom:10}}>
          <div style={{width:'50%'}}>
            <div css={classes.title}>Height</div>
            <div css={classes.info}>{data.height/10} m</div>
          </div>
          <div style={{width:'50%'}}>
            <div css={classes.title}>Weight</div>
            <div css={classes.info}>{data.weight/10} kg</div>
          </div>
        </div>
        <div style={{display:'flex'}}>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.title}>HP</div>
            <div css={classes.info}>{data.stats[0].base_stat}</div>
          </div>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.title}>Attack</div>
            <div css={classes.info}>{data.stats[1].base_stat}</div>
          </div>
          <div style={{width:`${100/3}%`}}>
            <div css={classes.title}>Defense</div>
            <div css={classes.info}>{data.stats[2].base_stat}</div>
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
          onClick={handleRelease}
        />
      </div>
    </div>
  );
};

export default Card;