import React, { useState } from 'react';
import { Box, Paper, makeStyles, Typography } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ToggleButton from '@mui/material/ToggleButton';
import Button from '@mui/material/Button';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
  grid_icon: {
    marginRight: '5px !important'
  }
}));

export interface ToggleFilterProps {
}

export default function ToggleFilter({}: ToggleFilterProps) {
  const [age, setAge] = useState('');
  const {t} = useTranslation()
  const classes = useStyles();


  return (
    <Paper className={classes.root}>
        <Box>
          <Typography variant="h6" gutterBottom>
            <Button variant="contained" startIcon={<AddBoxOutlinedIcon />}>
            { t('Add application') }
        </Button>
          </Typography>
        </Box>
        <Box>
            <ToggleButton value="module" className={classes.grid_icon} aria-label="module">
                <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="list" aria-label="list">
                <ViewListIcon />
            </ToggleButton>
        </Box>
    </Paper>
  );
}
