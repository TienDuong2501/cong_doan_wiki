import { Box, makeStyles } from '@material-ui/core';
import { useAppDispatch } from 'app/hooks';
import React, { useEffect } from 'react';
import EmptyData from './components/EmptyData';
import {
  gatewayActions,
} from './gatewaySlice';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
    paddingTop: theme.spacing(5),
  },

  loading: {
    position: 'absolute',
    top: theme.spacing(-1),
    width: '100%',
  },
}));

export default function Gateway() {
  const dispatch = useAppDispatch();

  const classes = useStyles();

  useEffect(() => {
    dispatch(gatewayActions.fetchData());
  }, [dispatch]);

  return (
    <Box className={classes.root}>
      Đặt câu hỏi
        {/* <Box className={classes.root}>
            <EmptyData />
        </Box> */}
    </Box>
  );
}
