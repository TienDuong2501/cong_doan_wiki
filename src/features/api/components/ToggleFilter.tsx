import React, { useState, ChangeEvent, useRef } from 'react';
import { Box, Paper, makeStyles, TextField } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewListIcon from '@mui/icons-material/ViewList';
import ToggleButton from '@mui/material/ToggleButton';
import { useRouteMatch } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { ListParams } from '../../../models'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(1),
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
	  borderRadius: '10px'
  },
  grid_icon: {
    marginRight: '5px !important',
    padding: '5px !important'
  },
  inputSearch: {
    margin: '0px !important'
  },
  toggleBtn: {
    textAlign: 'right'
  }
}));

export interface ToggleFilterProps {
  filter: ListParams,
  onChange:(newFilter: ListParams) => void,
  onSearchChange: (newFilter: ListParams) => void,
}

export default function ToggleFilter({ filter, onChange, onSearchChange}: ToggleFilterProps) {
  const searchRef = useRef<HTMLInputElement>();
  const {t} = useTranslation()
  const classes = useStyles();

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!onSearchChange) return;
    const newFilter: ListParams = {
      ...filter,
      _page: 1,
      name: e.target.value,
    };
    onSearchChange(newFilter);
  };

  return (
    <Paper className={classes.root}>
      <Grid container spacing={3} sx={{ flexGrow: 1 }}>
        <Grid xs md={6} mdOffset={3}>
            <TextField
              className={classes.inputSearch}
              fullWidth
              size="small"
              margin="normal"
              id="searchByName"
              name="name"
              defaultValue={filter?.name}
              inputRef={searchRef}
              onChange={handleSearchChange}
              variant="outlined"
            />
          </Grid>
          <Grid xs md={3} className={classes.toggleBtn}>
            <ToggleButton value="module" className={classes.grid_icon} aria-label="module">
                <ViewModuleIcon />
            </ToggleButton>
            <ToggleButton value="list" className={classes.grid_icon} aria-label="list">
                <ViewListIcon />
            </ToggleButton>
          </Grid>
        </Grid>
    </Paper>
  );
}
