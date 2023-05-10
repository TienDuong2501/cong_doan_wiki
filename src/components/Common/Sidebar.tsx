import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import CallToActionIcon from '@mui/icons-material/CallToAction';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';
import ListItemText from '@material-ui/core/ListItemText';
import PaidIcon from '@mui/icons-material/Paid';
import { makeStyles } from '@material-ui/core/styles';
import { Dashboard, PeopleAlt } from '@material-ui/icons';
import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },

  link: {
    color: 'inherit',
    textDecoration: 'none',

    '&.active > div': {
      backgroundColor: theme.palette.action.selected,
    },
  },
}));

export function Sidebar() {
  const { t } = useTranslation()
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <List component="nav" aria-label="main mailbox folders">
        <NavLink to="/cac-hoat-dong" className={classes.link}>
          <ListItem button>
            <CallToActionIcon color="primary">
              <Dashboard />
            </CallToActionIcon>
            <ListItemText primary={t('Các hoạt động ')} />
          </ListItem>
        </NavLink>

        <NavLink to="/thu-chi-hang-thang" className={classes.link}>
          <ListItem button>
            <PaidIcon color="primary">
              <PeopleAlt />
            </PaidIcon>
            <ListItemText primary={t('Thu chi hàng tháng')} />
          </ListItem>
        </NavLink>
        <NavLink to="/cac-cau-hoi-thuong-gap" className={classes.link}>
          <ListItem button>
            <HelpCenterIcon color="primary">
              <PeopleAlt />
            </HelpCenterIcon>
            <ListItemText primary={t('Các câu hỏi thường gặp')} />
          </ListItem>
        </NavLink>
        <NavLink to="/dat-cau-hoi" className={classes.link}>
          <ListItem button>
            <PsychologyAltIcon color="primary">
              <PeopleAlt />
            </PsychologyAltIcon>
            <ListItemText primary={t('Đặt câu hỏi')} />
          </ListItem>
        </NavLink>
        <NavLink to="/tai-lieu-theo-quy-dinh" className={classes.link}>
          <ListItem button>
            <TextSnippetIcon color="primary">
              <PeopleAlt />
            </TextSnippetIcon>
            <ListItemText primary={t('Tài liệu theo quy định')} />
          </ListItem>
        </NavLink>
        {/* <NavLink to="/open-api/setting" className={classes.link}>
          <ListItem button>
            <ListItemIcon>
              <PeopleAlt />
            </ListItemIcon>
            <ListItemText primary={t('Setting')} />
          </ListItem>
        </NavLink> */}
      </List>
    </div>
  );
}
