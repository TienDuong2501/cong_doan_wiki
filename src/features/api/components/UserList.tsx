import { Button, Paper, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { styled, alpha } from '@mui/material/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {  Api, User } from 'models';
import React, { useState } from 'react';
import { capitalizeString, getMarkColor } from 'utils';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { yupResolver } from '@hookform/resolvers/yup';
import DialogTitle from '@material-ui/core/DialogTitle';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Menu, { MenuProps } from '@mui/material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';
import userApi from 'api/userApi';

const useStyles = makeStyles((theme) => ({
  table: {},
  form_dialog_user: {
    width: '100%',
  },
  table_header: {
    background: '#e0e0e057'
  },
  fullname: {
    fontFamily: 'Manrope',
    fontSize: '14px',
    lineHeight: '22px',
    color: '#171A1FFF', 
  },
  username: {
    fontFamily: 'Manrope',
    fontSize: '14px', 
    lineHeight: '22px', 
    color: '#565E6CFF' 
  },
  edit: {
    marginRight: theme.spacing(1),
  },
}));

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
];

const StyledMenu = styled((props: MenuProps) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));

 interface ApiFormValues {
	id: number | string;
	status: string;
	fileUploads: []
}
const schema = yup.object().shape({
    user: yup
    .string()
    .max(100, 'The API name may not be greater than 100 characters.')
    .required('Please enter API name.'),    
    role: yup
    .string()
    .max(100, 'The API name may not be greater than 100 characters.')
    .required('Please enter API name.'),    
});
export interface UserListProps {
  userList: User[];
  onEdit?: (user: User) => void;
  onRemove?: (user: User) => void;
}

export default function UserList({
  userList,
  onEdit,
  onRemove,
}: UserListProps) {
  const classes = useStyles();
  const {t} = useTranslation()
  const [selectedUser, setSelectedUser] = useState<User[]>([]);
  const [openDialog, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
  };

  const handleFormSubmit = async (formValues: ApiFormValues) => {
    console.log('aaaaaaaaaaaaa', schema, control);
  };

  const handleChange = (event: SelectChangeEvent) => {
    console.log('xxxxxxxxx')
    setSelectedUser(event.target.value);
  };

//   const getUserList = () => {
//     const newFilter: ListParams = {
//         ...filter,
//         _page: 1,
//         name: e.target.value,
//     };
//     userApi.getAll()
//     // get list users to 
//   }

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Api>({
    // defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  
  const handleClickAddUser = () => {
    handleClose()
    setOpen(true);
  };

  const stringToColor = (string: string) => {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  const stringAvatar = (name: string) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const getFullname = (firstName: string, lastName: string) => {
    return `${firstName} ${lastName}`
  }

  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} size="small" aria-label="simple table">
          <TableHead>
            <TableRow className={classes.table_header}>
              <TableCell>Avatar</TableCell>
              <TableCell>Username</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {userList.map((user, index) => (
              <TableRow key={index}>
                <TableCell width={110}>
                    {
                        user.avatarUrl ? (
                            <Avatar alt="Remy Sharp" src={user.avatarUrl} />
                        ) : (
                            <Avatar {...stringAvatar(`${user.firstName} ${user.lastName}`)} />
                        )
                    }
                </TableCell>
                <TableCell>
                <Typography className={classes.fullname} style={{fontWeight: '500'}} gutterBottom>
                    { getFullname(user.firstName, user.lastName) }
                </Typography>
                <Typography className={classes.username} display="block" gutterBottom>
                    {user.username}
                </Typography>
                </TableCell>
                <TableCell>{capitalizeString(user.email)}</TableCell>
                <TableCell>{user.status}</TableCell>
                <TableCell align="right" width={210}>
                    <Button 
                        id={`${index}-demo-customized-button`}
                        aria-controls={open ? 'demo-customized-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        variant="contained"
                        disableElevation
                        onClick={handleClick}
                        variant="text">
                        <MoreVertIcon/>
                    </Button>
                    <StyledMenu
                        id={`${index}-demo-customized-menu`}
                        MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={handleClickAddUser} disableRipple>
                            <AddBoxIcon />
                            {t('Add')}
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                            <EditIcon />
                            {t('Edit')}
                        </MenuItem>
                        <MenuItem onClick={handleClose} disableRipple>
                        <FileCopyIcon />
                            {t('Duplicate')}
                        </MenuItem>
                        <Divider sx={{ my: 0.5 }} />
                        <MenuItem onClick={handleClose} disableRipple>
                            <DeleteIcon />
                            {t('Delete')}
                        </MenuItem>
                    </StyledMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <Dialog
        fullScreen={fullScreen}
        fullWidth="true"
        open={openDialog}
        disableEnforceFocus
        maxWidth='md'
        onClose={handleCloseDialog}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle classes="titleDialog" id="responsive-dialog-title">
          {t("Add user")}
        </DialogTitle>
        <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form_dialog_user}>
            <DialogContent>
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <FormControl fullWidth size="small">
                        <InputLabel id="demo-multiple-name-label">{t('User name')}</InputLabel>
                        <Select
                        labelId="demo-multiple-name-label"
                        id="demo-multiple-name"
                        multiple
                        value={selectedUser}
                        onChange={handleChange}
                        input={<OutlinedInput label="Name" />}
                        >
                        {names.map((name) => (
                            <MenuItem
                            key={name}
                            value={name}
                            >
                            {name}
                            </MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
                {
                    selectedUser.length ? 
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth size="small">
                                <InputLabel id="demo-select-small-label">{t('Roles')}</InputLabel>
                                <Select
                                    labelId="demo-select-small-label"
                                    id="demo-select-small"
                                    label="role"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={'duongnt72'}>duongnt72</MenuItem>
                                    <MenuItem value={'thangnt30'}>thangnt30</MenuItem>
                                    <MenuItem value={'namth38'}>namth38</MenuItem>
                                </Select>
                            </FormControl> 
                        </Grid>
                    </Grid>
                    : null
                }
            </DialogContent>
            <DialogActions>
            <Button autoFocus onClick={handleCloseDialog}>
                {t('Cancel')}
            </Button>
            <Button type="submit" onClick={handleCloseDialog} autoFocus>
                {t('Add')}
            </Button>
            </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
