import * as React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  main_image: {
    marginBottom: '0px !important',
  },
}));

interface MainFeaturedPostProps {
  post: {
    description: string;
    image: string;
    imageText: string;
    linkText: string;
    title: string;
  };
}

export default function BannerHeader(props: MainFeaturedPostProps) {
  const { post } = props;
  const classes = useStyles();

  return (
    <Paper
      className={classes.main_image}
      sx={{
        position: 'relative',
        backgroundColor: 'grey.800',
        color: '#fff',
        height: '250px',
        marginBottom: '0px !important',
        mb: 4,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url(${post.image})`,
      }}
    >
      {/* {<img style={{ display: 'none'}} src={post.image} alt={post.imageText} />} */}
      <Box
        sx={{
          position: 'absolute',
          marginBottom: '0px !important',
          top: 0,
          bottom: 0,
          right: 0,
          left: 0,
          backgroundColor: 'rgba(0,0,0,.3)',
        }}
      />
      <Grid container>
        <Grid item md={6}>
          <Box
            sx={{
              position: 'relative',
              marginBottom: '0px !important',
              p: { xs: 3, md: 6 },
              pr: { md: 0 },
            }}
          >
            <Typography component="h1" variant="h3" color="inherit" gutterBottom>
              {post.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {post.description}
            </Typography>
            <Link variant="subtitle1" href="#">
              {post.linkText}
            </Link>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}