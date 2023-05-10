import { Box, makeStyles } from '@material-ui/core';
import { Header, Sidebar, NotFound } from 'components/Common';
import Dashboard from 'features/dashboard';
import Api from 'features/api';
import Application from 'features/application';
import Gateway from 'features/gateway';
import * as React from 'react';
import { Route, Switch } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    gridTemplateColumns: '240px 1fr',
    gridTemplateAreas: `"header header" "sidebar main"`,

    minHeight: '100vh',
  },

  header: {
    gridArea: 'header',
  },
  sidebar: {
    gridArea: 'sidebar',
    borderRight: `1px solid ${theme.palette.divider}`,
    backgroundColor: theme.palette.background.paper,
  },
  main: {
    gridArea: 'main',
    // backgroundColor: theme.palette.background.paper,
    background: '#FAFAFBFF',
    padding: theme.spacing(2, 3),
  },
}));

export function DashboardLayout() {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.header}>
        <Header />
      </Box>

      <Box className={classes.sidebar}>
        <Sidebar />
      </Box>

      <Box className={classes.main}>
        <Switch>
          <Route path="/cac-hoat-dong">
            <Dashboard />
          </Route>
          <Route path="/thu-chi-hang-thang">
            <Api />
          </Route>
          <Route path="/cac-cau-hoi-thuong-gap">
            <Application/>
          </Route>
          <Route path="/dat-cau-hoi">
            <Gateway/>
          </Route>
          <Route path="/tai-lieu-theo-quy-dinh">
            Tài liệu theo quy trình
          </Route>
          {/* <Route path="/open-api/setting">
            SETTING
          </Route> */}
          <Route path="/*">
            {/* <NotFound /> */}
            <Dashboard />
          </Route>
        </Switch>
      </Box>
    </Box>
  );
}
