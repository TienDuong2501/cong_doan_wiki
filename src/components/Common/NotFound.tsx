import * as React from 'react';
import { Box, Button, Container, Typography, Grid } from '@mui/material';
import not_found_image from '../../assets/404_images/404.png'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { makeStyles } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export interface  NotFoundProps {}
const useStyles = makeStyles((theme) => ({
    textLink: {
      textDecoration: 'none',
      fontWeight: 400,
      fontSize: '0.875rem',
      lineHeight: '1.43',
      letterSpacing: '0.01071em',
      color: '#ffffff'
    },
}));
export function NotFound (props:  NotFoundProps) {
  const { t } = useTranslation()
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid xs={6}>
            <Typography variant="h1">
              404
            </Typography>
            <Typography variant="h6">
              { t('The page you’re looking for doesn’t exist.') }
            </Typography>
            <Button variant="contained" startIcon={<ArrowBackIcon />}>
              <Link to="/open-api/dashboard" className={classes.textLink}>
                { t('Go to dashboard') }
              </Link>
            </Button>
          </Grid>
          <Grid xs={6}>
            <img
              src={not_found_image}
              alt=""
              width={500} height={250}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}