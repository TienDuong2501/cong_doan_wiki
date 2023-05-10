import React, { useState } from 'react';
import { Grid, makeStyles, Typography, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import empty_icon from '../../../assets/common_images/empty_data.png'

const useStyles = makeStyles((theme) => ({
  empty_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  grid_item: {
    textAlign: 'center'
  },
  empty_img: {
    width: '350px',
    height: 'auto'
  }
}));

export default function EmptyData() {
  const {t} = useTranslation()
  const classes = useStyles();

  return (
    <Container className={classes.empty_container}>
        <Grid container spacing={2}>
            <Grid xs={12} className={classes.grid_item}>
                <img
                src={empty_icon}
                className={classes.empty_img}
                />
            </Grid>
            <Grid xs={12} className={classes.grid_item}>
                <Typography variant="h5" gutterBottom>
                  { t('Have no API') }
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {t('Try with others key words')}
                </Typography>
            </Grid>
        </Grid>
    </Container>
  );
}
