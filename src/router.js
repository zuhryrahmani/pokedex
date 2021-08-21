// main
/** @jsxImportSource @emotion/react */
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { jsx } from '@emotion/react'
import { BottomNavigation, BottomNavigationAction, ThemeProvider } from '@material-ui/core';
import { HomeRounded } from '@material-ui/icons';
import theme from './assets/theme';

// pages
import Home from './pages/home';
import Detail from './pages/pokedex';
import MyList from './pages/myList';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

// assets
import homeGray from './assets/icons/home-gray.svg';
import homeYellow from './assets/icons/home-yellow.svg';
import pokeballGray from './assets/icons/pokeball-gray.svg';
import pokeballYellow from './assets/icons/pokeball-yellow.svg';
import pokemonGray from './assets/icons/pokemon-gray.svg';
import pokemonYellow from './assets/icons/pokemon-yellow.svg';

const Router = () => {

  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(null);

  const breakpoints = [576, 768, 992, 1200];
  const mq = breakpoints.map(bp => `@media (max-width: ${bp}px)`);
  const classes = {
    navigation: {
      '&.MuiBottomNavigation-root': {
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#343E63',
        height: 80,
        borderRadius: '25px 25px 0 0',
        overflow: 'hidden',
        boxShadow: '0 -5px 20px 0 rgba(0,0,0,0.3)',
        '& .MuiBottomNavigationAction-root': {
          maxWidth: 'none',
          color: '#fff',
          '& .MuiBottomNavigationAction-wrapper': {
            opacity: 0.6,
            '& .MuiBottomNavigationAction-label': {
              fontFamily: 'Lato, sans-serif',
              [mq[1]]: {
                display: 'none'
              }
            }
          }
        },
        '& .Mui-selected': {
          '& .MuiBottomNavigationAction-wrapper': {
            opacity: 1,
            // '& img': {
            //   transform: 'scale(1.2)'
            // }
          }
        }
      },
    },
    iconContainer: {
      padding: '8px 7px 5px',
      borderRadius: '50%',
      transition: '0.2s 0.1s'
    },
    icon: {
      width: 24,
      height: 24,
      objectFit: 'cover',
      objectPosition: 'center',
      // transition: '0.2s 0.1s',
      // marginBottom: 3,
      // '&::before': {
      //   content: '',
      //   display: 'inline-block'
      // }
    }
  };

  const selectedMenu = (n, pic1, pic2) => {
    if(page === n) {
      return (
        <div css={classes.iconContainer}>
          <img src={pic2} css={classes.icon} />
        </div>
      );
    } else {
      return <img src={pic1} css={classes.icon} style={{marginBottom:6}} />;
    }
  };

  useEffect(() => {
    if(location) {
      if(location.pathname === '/') {
        setPage(0);
      } else if(location.pathname === '/pokedex') {
        setPage(1);
      } else {
        setPage(2);
      };
    };
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/pokedex' component={Detail} />
        <Route exact path='/my-pokemon-list' component={MyList} />
      </Switch>
      <BottomNavigation
        value={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
        showLabels
        css={classes.navigation}
      >
        <BottomNavigationAction label="Home" icon={<div css={classes.iconContainer} style={{backgroundColor: page===0 ? '#2A3050' : '#343E63'}}><img src={page===0 ? homeYellow : homeGray} css={classes.icon} /></div>} onClick={() => history.push('/')} />
        <BottomNavigationAction label="Pokédex" icon={<div css={classes.iconContainer} style={{backgroundColor: page===1 ? '#2A3050' : '#343E63'}}><img src={page===1 ? pokeballYellow : pokeballGray} css={classes.icon} /></div>} onClick={() => history.push('/pokedex')} />
        <BottomNavigationAction label="My Pokémon List" icon={<div css={classes.iconContainer} style={{backgroundColor: page===2 ? '#2A3050' : '#343E63'}}><img src={page===2 ? pokemonYellow : pokemonGray} css={classes.icon} /></div>} onClick={() => history.push('/my-pokemon-list')} />
      </BottomNavigation>
    </ThemeProvider>
  );
};

export default Router;