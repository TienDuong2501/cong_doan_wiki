import React, { useState } from 'react';
import { Box, Grid, Paper, makeStyles, Typography } from '@material-ui/core';
import Select, { SelectChangeEvent } from '@mui/material/Select';
// import InputLabel from '@mui/material/InputLabel';
import {FormControl} from '@mui/material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers-pro/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.divider}`,
  },
  grid_date: {
    marginRight: '5px !important'
  }
}));

export interface StatisticFilterProps {
}

export default function StatisticFilter({}: StatisticFilterProps) {
  const [age, setAge] = useState('');
  const {t} = useTranslation()
  const classes = useStyles();
  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value);
  };

  return (
    <Paper className={classes.root}>
        <Box>
          <Typography variant="h6" gutterBottom>
              {t('Choose a time')}
          </Typography>
        </Box>
        <Box component="form">
          <FormControl margin="normal" className={classes.grid_date} component="fieldset">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={t('From Date')}/>
            </LocalizationProvider>
          </FormControl>
          <FormControl margin="normal" component="fieldset" >
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker label={t('To Date')}/>
            </LocalizationProvider>
          </FormControl>
        </Box>
    </Paper>
  );
}
