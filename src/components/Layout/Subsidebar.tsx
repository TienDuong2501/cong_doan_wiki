import * as React from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import { makeStyles } from '@material-ui/core';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import { TextAreaField } from 'components/FormFields';


const useStyles = makeStyles((theme) => ({
  related_card: {
    marginBottom: '30px !important',
  },
  floatAddBtn: {
    // bottom: '100px',
    float: 'right',
    right: '60px'
  },
}));
interface SidebarProps {
  // archives: ReadonlyArray<{
  //   url: string;
  //   title: string;
  // }>;
  // description: string;
  social: ReadonlyArray<{
    icon: React.ElementType;
    name: string;
    date: string;
    description: string;
  }>;
  // title: string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function SubSidebar(props: SidebarProps) {
  const { social } = props;

  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const classes = useStyles();

  return (
    <Grid item xs={12} md={12}>
      {/* <Paper elevation={0} sx={{ p: 2, bgcolor: 'grey.200' }}>
        <Typography variant="h6" gutterBottom>
          {title}
        </Typography>
        <Typography>{description}</Typography>
      </Paper>
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Archives
      </Typography>
      {archives.map((archive) => (
        <Link display="block" variant="body1" href={archive.url} key={archive.title}>
          {archive.title}
        </Link>
      ))} */}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Các câu hỏi liên quan
      </Typography>
      {social.map((network) => (
        <CardActionArea component="a" href="#" className={classes.related_card} onClick={handleClickOpen}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {network.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {network.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {network.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
            {/* <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={post.image}
              alt={post.imageLabel}
            /> */}
          </Card>
        </CardActionArea>
        // <Link
        //   display="block"
        //   variant="body1"
        //   href="#"
        //   key={network.name}
        //   sx={{ mb: 0.5 }}
        // >
        //   <Stack direction="row" spacing={1} alignItems="center">
        //     <network.icon />
        //     <span>{network.name}</span>
        //   </Stack>
        // </Link>
      ))}
      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
        Các câu trả lời mới nhất
      </Typography>
      {social.map((network) => (
        <CardActionArea component="a" href="#" className={classes.related_card} onClick={handleClickOpen}>
          <Card sx={{ display: 'flex' }}>
            <CardContent sx={{ flex: 1 }}>
              <Typography component="h2" variant="h5">
                {network.name}
              </Typography>
              <Typography variant="subtitle1" color="text.secondary">
                {network.date}
              </Typography>
              <Typography variant="subtitle1" paragraph>
                {network.description}
              </Typography>
              <Typography variant="subtitle1" color="primary">
                Continue reading...
              </Typography>
            </CardContent>
            {/* <CardMedia
              component="img"
              sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
              image={post.image}
              alt={post.imageLabel}
            /> */}
          </Card>
        </CardActionArea>
        // <Link
        //   display="block"
        //   variant="body1"
        //   href="#"
        //   key={network.name}
        //   sx={{ mb: 0.5 }}
        // >
        //   <Stack direction="row" spacing={1} alignItems="center">
        //     <network.icon />
        //     <span>{network.name}</span>
        //   </Stack>
        // </Link>
      ))}
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Modal title
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography gutterBottom>
            Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
            dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
            consectetur ac, vestibulum at eros.
          </Typography>
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </Grid>
  );
}