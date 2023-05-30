// import { Box, makeStyles } from '@material-ui/core';
// import { Header, Sidebar, NotFound } from 'components/Common';
// import Dashboard from 'features/dashboard';
// import Api from 'features/api';
// import Application from 'features/application';
// import Gateway from 'features/gateway';
// import * as React from 'react';
// import { Route, Switch } from 'react-router-dom';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     display: 'grid',
//     gridTemplateRows: 'auto 1fr',
//     gridTemplateColumns: '240px 1fr',
//     gridTemplateAreas: `"header header" "sidebar main"`,

//     minHeight: '100vh',
//   },

//   header: {
//     gridArea: 'header',
//   },
//   sidebar: {
//     gridArea: 'sidebar',
//     borderRight: `1px solid ${theme.palette.divider}`,
//     backgroundColor: theme.palette.background.paper,
//   },
//   main: {
//     gridArea: 'main',
//     // backgroundColor: theme.palette.background.paper,
//     background: '#FAFAFBFF',
//     padding: theme.spacing(2, 3),
//   },
// }));

// export function DashboardLayout() {
//   const classes = useStyles();

//   return (
//     <Box className={classes.root}>
//       <Box className={classes.header}>
//         <Header />
//       </Box>

//       <Box className={classes.sidebar}>
//         <Sidebar />
//       </Box>

//       <Box className={classes.main}>
//         <Switch>
//           <Route path="/cac-hoat-dong">
//             <Dashboard />
//           </Route>
//           <Route path="/thu-chi-hang-thang">
//             <Api />
//           </Route>
//           <Route path="/cac-cau-hoi-thuong-gap">
//             <Application/>
//           </Route>
//           <Route path="/dat-cau-hoi">
//             <Gateway/>
//           </Route>
//           <Route path="/tai-lieu-theo-quy-dinh">
//             Tài liệu theo quy trình
//           </Route>
//           {/* <Route path="/open-api/setting">
//             SETTING
//           </Route> */}
//           <Route path="/*">
//             {/* <NotFound /> */}
//             <Dashboard />
//           </Route>
//         </Switch>
//       </Box>
//     </Box>
//   );
// }

import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import GitHubIcon from '@mui/icons-material/GitHub';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Header from './Header';
import BannerHeader from './BannerHeader';
import FeaturedPost from './FeaturedPost';
import Subsidebar from './Subsidebar';
import Footer from './Footer';
import ListCommonQuestions from './ListCommonQuestions';
import { Menu } from 'components/Common';
import { Box, makeStyles } from '@material-ui/core';
import Dashboard from 'features/dashboard';
import Api from 'features/api';
import Application from 'features/application';
import Gateway from 'features/gateway';
import { Route, Switch } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


const useStyles = makeStyles((theme) => ({
  // root: {
  //   display: 'grid',
  //   gridTemplateRows: 'auto 1fr',
  //   gridTemplateColumns: '240px 1fr',
  //   gridTemplateAreas: `"header header" "sidebar main"`,
  //   minHeight: '100vh',
  // },

  // header: {
  //   gridArea: 'header',
  // },
  // sidebar: {
  //   gridArea: 'sidebar',
  //   borderRight: `1px solid ${theme.palette.divider}`,
  //   backgroundColor: theme.palette.background.paper,
  // },
  floatAddBtn: {
    // bottom: '100px',
    float: 'right',
    right: '60px',
    bottom: '200px'
  },
  main: {
    gridArea: 'main',
    // backgroundColor: theme.palette.background.paper,
    background: '#FAFAFBFF',
    padding: theme.spacing(2, 3),
    height: 'calc(100vh - 300px)',
    overflow: 'auto',
    'overflow-y': 'overlay',
	  borderRadius: '10px',
    '&::-webkit-scrollbar': {
      width: '10px'
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 5px rgb(225 224 224 / 36%)',
      borderRadius: '10px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: 'rgb(0 0 0 / 32%)',
      borderRadius: '10px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: 'rgb(0 0 0 / 32%)'
    }
  },
}));
const sections = [
  { title: 'Technology', url: '#' },
  { title: 'Design', url: '#' },
  { title: 'Culture', url: '#' },
  { title: 'Business', url: '#' },
  { title: 'Politics', url: '#' },
  { title: 'Opinion', url: '#' },
  { title: 'Science', url: '#' },
  { title: 'Health', url: '#' },
  { title: 'Style', url: '#' },
  { title: 'Travel', url: '#' },
];

const mainFeaturedPost = {
  title: 'Title of a longer featured blog post',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: 'https://source.unsplash.com/random/?blog/',
  imageText: 'main image description',
  linkText: 'Continue reading…',
};

const featuredPosts = [
  {
    title: 'Featured post',
    date: 'Nov 12',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?blog/',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?blog/',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?blog/',
    imageLabel: 'Image Text',
  },
  {
    title: 'Post title',
    date: 'Nov 11',
    description:
      'This is a wider card with supporting text below as a natural lead-in to additional content.',
    image: 'https://source.unsplash.com/random/?blog/',
    imageLabel: 'Image Text',
  },
];

// const posts = [post1, post2, post3];

const sidebar = {
  // title: 'About',
  // description:
  //   'Etiam porta sem malesuada magna mollis euismod. Cras mattis consectetur purus sit amet fermentum. Aenean lacinia bibendum nulla sed consectetur.',
  // archives: [
  //   { title: 'March 2020', url: '#' },
  //   { title: 'February 2020', url: '#' },
  //   { title: 'January 2020', url: '#' },
  //   { title: 'November 1999', url: '#' },
  //   { title: 'October 1999', url: '#' },
  //   { title: 'September 1999', url: '#' },
  //   { title: 'August 1999', url: '#' },
  //   { title: 'July 1999', url: '#' },
  //   { title: 'June 1999', url: '#' },
  //   { title: 'May 1999', url: '#' },
  //   { title: 'April 1999', url: '#' },
  // ],
  social: [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ],
};

const theme = createTheme();

export  function DashboardLayout() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [openForm, setOpenForm] = React.useState(false);
  const handleClickOpenForm = () => {
    setOpenForm(true);
  };
  const handleCloseForm = () => {
    setOpenForm(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header title="Công đoàn trung tâm Chuyển Đổi Số" sections={sections} />
        <BannerHeader post={mainFeaturedPost} />
        {/* menu */}
        <Menu/>
        <main>
          {/* content list item */}
          <Grid item xs={12} md={6}>
           <Box className={classes.main}>
             <Switch>
               <Route path="/cac-hoat-dong">
                 {/* <Dashboard /> */}
                 {featuredPosts.map((post) => (
                    <FeaturedPost key={post.title} post={post} />
                  ))}
               </Route>
               <Route path="/thu-chi-hang-thang">
                 <Api />
               </Route>
               <Route path="/cac-cau-hoi-thuong-gap">
               <Grid container spacing={2}>
                <Grid item xs={9}>
                  {featuredPosts.map((post) => (
                    <ListCommonQuestions  key={post.title} post={post}/>
                  ))}
                </Grid>
                <Grid item xs={3}>
                  <Subsidebar
                    social={sidebar.social}
                  />
                </Grid>
              </Grid>
               </Route>
               {/* <Route path="/dat-cau-hoi">
                 <Gateway/>
               </Route>
               <Route path="/tai-lieu-theo-quy-dinh">
                 Tài liệu theo quy trình
               </Route> */}
               {/* <Route path="/open-api/setting">
                 SETTING
               </Route> */}
               <Route path="/*">
                 {/* <NotFound /> */}
                 <Dashboard />
               </Route>
             </Switch>
           </Box>
           {/* className={classes.floatAddBtn} onClick={handleClickOpenForm} */}
           <Fab color="primary" variant="extended" onClick={handleClickOpenForm} className={classes.floatAddBtn} aria-label="add">
            <AddIcon />
            Đặt câu hỏi
          </Fab>
            {/* {featuredPosts.map((post) => (
              <FeaturedPost key={post.title} post={post} />
            ))} */}
          </Grid>
          {/* <Grid container spacing={5} sx={{ mt: 3 }}>
          </Grid> */}
        </main>
      </Container>
      <Dialog open={openForm} onClose={handleCloseForm}>
        <DialogTitle>Đặt câu hỏi</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            minRows={3}
            maxRows={5}
            multiline
            fullWidth
            size="small"
            margin="normal"
            // value={value}
            // onChange={onChange}
            // onBlur={onBlur}
            // label={t(`${label}`)}
            // variant="outlined"
            // inputRef={ref}
            // error={invalid || isError}
            // helperText={error?.message ? t(`${error?.message}`) : messageError ? t(`${messageError}`) : null}
            // required={required}
            // inputProps={inputProps}
          />
          {/* <TextAreaField name="description"  required minRows={3} maxRows={8} label="Description"/> */}
          {/* <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Email Address"
            type="email"
            fullWidth
            variant="standard"
          /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button onClick={handleCloseForm}>Subscribe</Button>
        </DialogActions>
      </Dialog>
      <Footer
        title="Công đoàn chuyển đổi số"
        description="Mọi tài nguyên tại website thuộc bản quyền của Trung tâm Chuyển Đổi Số!"
      />
    </ThemeProvider>
  );
}