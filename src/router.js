/** @jsxImportSource @emotion/react */
// main
import React, { useState, useEffect } from 'react';
import { Switch, Route, useHistory, useLocation } from 'react-router-dom';
import { jsx } from '@emotion/react'
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';

// pages
import Home from './pages/home';
import Detail from './pages/detail';
import MyList from './pages/myList';

import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';

const Router = () => {

  const history = useHistory();
  const location = useLocation();
  const [page, setPage] = useState(null);

  const classes = {
    navigation: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      '& .MuiBottomNavigationAction-root': {
        maxWidth: 'none'
      }
    }
  };

  useEffect(() => {
    if(location) {
      if(location.pathname === '/detail') {
        setPage(0);
      } else if(location.pathname === '/my-list') {
        setPage(2);
      } else {
        setPage(1);
      };
    };
  }, [location]);

  return (
    <div>
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/detail' component={Detail} />
        <Route exact path='/my-list' component={MyList} />
      </Switch>
      <BottomNavigation
        value={page}
        onChange={(event, newValue) => {
          setPage(newValue);
        }}
        showLabels
        css={classes.navigation}
      >
        <BottomNavigationAction label="Pokemon Detail" icon={<RestoreIcon />} onClick={() => history.push('/detail')} />
        <BottomNavigationAction label="Pokédex" icon={<FavoriteIcon />} onClick={() => history.push('/')} />
        <BottomNavigationAction label="My Pokemon List" icon={<LocationOnIcon />} onClick={() => history.push('/my-list')} />
      </BottomNavigation>
    </div>
  );
};

export default Router;