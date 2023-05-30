import * as React from 'react';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme) => ({
    menuContainer: {
      minHeight: '0px !important'
    },
  
    link: {
        backgroundColor: '#ee0033 !important',
        color: '#fff !important',
        fontweight: '600'
    },
  }));

export function Menu() {
  const [value, setValue] = React.useState(0);
  const { t } = useTranslation()
  const classes = useStyles();

  return (
      <Box>
        <List component="nav" aria-label="main mailbox folders" className={classes.link}>
            <BottomNavigation
                showLabels
                value={value}
                className={classes.link}
                onChange={(event, newValue) => {
                setValue(newValue);
                }}
            >
                <NavLink to="/cac-hoat-dong" className={classes.link}>
                    <BottomNavigationAction label="Các hoạt động " className={classes.link} showLabel icon={<RestoreIcon />} />
                </NavLink>

                <NavLink to="/thu-chi-hang-thang" className={classes.link}>
                    <BottomNavigationAction label="Thu chi hàng tháng" className={classes.link} showLabel icon={<FavoriteIcon />} />
                </NavLink>
                <NavLink to="/cac-cau-hoi-thuong-gap" className={classes.link}>
                    <BottomNavigationAction label="Các câu hỏi thường gặp" className={classes.link} showLabel icon={<LocationOnIcon />} />
                </NavLink>
                {/* <NavLink to="/dat-cau-hoi" className={classes.link}>
                    <BottomNavigationAction label="Đặt câu hỏi" showLabel icon={<LocationOnIcon />} />
                </NavLink>
                <NavLink to="/tai-lieu-theo-quy-dinh" className={classes.link}>
                    <BottomNavigationAction label="Tài liệu theo quy trình" showLabel icon={<LocationOnIcon />} />
                </NavLink> 
                <NavLink to="/open-api/setting" className={classes.link}>
                <ListItem button>
                    <ListItemIcon>
                    <PeopleAlt />
                    </ListItemIcon>
                    <ListItemText primary={t('Setting')} />
                </ListItem>
                </NavLink> */}
        </BottomNavigation>
        </List>
    </Box>
  );
}