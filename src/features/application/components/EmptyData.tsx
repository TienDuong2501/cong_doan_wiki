import React, { useState } from 'react';
import { Grid, makeStyles, Typography, Container } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import empty_icon from '../../../assets/common_images/empty_data.png'

const useStyles = makeStyles((theme) => ({
  empty_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 'calc(100vh - 300px)'
  },
  grid_item: {
    textAlign: 'center'
  },
  empty_img: {
    width: '350px',
    height: 'auto'
  }
}));

export interface EmptyDataProps {
}

export default function EmptyData({}: EmptyDataProps) {
  const {t} = useTranslation()
  const classes = useStyles();


  return (
    <Container maxWidth="md" className={classes.empty_container}>
        <Grid container spacing={2}>
            <Grid xs={12} className={classes.grid_item}>
                <img
                src={empty_icon}
                className={classes.empty_img}
                />
            </Grid>
            <Grid xs={12} className={classes.grid_item}>
                <Typography variant="h5" gutterBottom>
                  { t('Have no application') }
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {t('Try with others key words')}
                </Typography>
            </Grid>
        </Grid>
    </Container>
  );
}
