import { Box, makeStyles, LinearProgress } from '@material-ui/core';
import { useAppDispatch, useAppSelector } from 'app/hooks';
import { useTranslation } from 'react-i18next';
import { Link, useRouteMatch } from 'react-router-dom';
import Stack from '@mui/material/Stack';
import React, { useEffect } from 'react';
import EmptyData from 'features/api/components/EmptyData';
import ApiListData from 'features/api/components/ApiListData';
import ToggleFilter from 'features/api/components/ToggleFilter';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab';
import Popover from '@mui/material/Popover';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import Pagination from '@mui/material/Pagination';
import { ListParams } from '../../../models'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Grid from '@mui/material/Grid';
import {
  selectApiLoading,
  selectApiFilter,
  selectApiList,
  selectApiPagination,
  apiActions,
} from '../apiSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingTop: theme.spacing(3),
    width: '100%',
  },
  main_body_with_pagination: {
    height: 'calc(100vh - 285px)',
    overflow: 'auto',
    width: '100%',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
	  borderRadius: '10px',
    background: '#FFF',
    padding: theme.spacing(2)
  },
  main_body_without_pagination: {
    height: 'calc(100vh - 240px)',
    overflow: 'auto',
    width: '100%',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
	  borderRadius: '10px',
    background: '#FFF',
    padding: theme.spacing(2)
  },
  titleContainer: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',

    marginBottom: theme.spacing(4),
  },
  floatAddBtn: {
    bottom: '100px',
    float: 'right',
    right: '60px'
  },
  popoverList: {
    width: '100%',
    maxWidth: 360,
    bgcolor: 'background.paper',
  },
  popoverLink: {
    color: '#565E6CFF',
    fontSize: '14px',
    textDecoration: 'none',
    width: '100%'
  },
  loading: {
    marginTop: theme.spacing(3),
    width: '100%',
    borderRadius: '20px'
  },
  pagination: {
    padding: '20px',
    marginTop: theme.spacing(1),
    background: '#FFF',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    borderRadius: '10px',
    textAlign: 'center',
  }
}));

interface Column {
  id: 'name' | 'code' | 'population' | 'size' | 'density';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO\u00a0Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size\u00a0(km\u00b2)',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value: number) => value.toFixed(2),
  },
];

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number,
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData('India', 'IN', 1324171354, 3287263),
  createData('China', 'CN', 1403500365, 9596961),
  createData('Italy', 'IT', 60483973, 301340),
  createData('United States', 'US', 327167434, 9833520),
  createData('Canada', 'CA', 37602103, 9984670),
  createData('Australia', 'AU', 25475400, 7692024),
  createData('Germany', 'DE', 83019200, 357578),
  createData('Ireland', 'IE', 4857000, 70273),
  createData('Mexico', 'MX', 126577691, 1972550),
  createData('Japan', 'JP', 126317000, 377973),
  createData('France', 'FR', 67022000, 640679),
  createData('United Kingdom', 'GB', 67545757, 242495),
  createData('Russia', 'RU', 146793744, 17098246),
  createData('Nigeria', 'NG', 200962417, 923768),
  createData('Brazil', 'BR', 210147125, 8515767),
];

export default function ListApiPage() {
  // const match = useRouteMatch();
  const classes = useStyles();
  // const ApiList = useAppSelector(selectApiList);
  // const pagination = useAppSelector(selectApiPagination);
  // const filter = useAppSelector(selectApiFilter);
  // const loading = useAppSelector(selectApiLoading);
  // const {t} = useTranslation()

  // const dispatch = useAppDispatch();
  // useEffect(() => {
  //   dispatch(apiActions.fetchApiList(filter));
  // }, [dispatch, filter]);

  // const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  // const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  //   setAnchorEl(event.currentTarget);
  // };

  // const handleClose = () => {
  //   setAnchorEl(null);
  // };

  // const open = Boolean(anchorEl);
  // const id = open ? 'simple-popover' : undefined;
  // const handleEditApi = (value: any) => {
  // }
  // const handleRemoveApi = (value: any) => {
  // }
  // const handlePageChange = (e: any, page: number) => {
  //   dispatch(
  //     apiActions.setFilter({
  //       ...filter,
  //       _page: page,
  //     })
  //   );
  // };
  // const handleSearchChange = (newFilter: ListParams) => {
  //   dispatch(apiActions.setFilterWithDebounce(newFilter));
  // };

  // const handleFilterChange = (newFilter: ListParams) => {
  //   dispatch(apiActions.setFilter(newFilter));
  // };
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid item xs={12} md={12}>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof value === 'number'
                              ? column.format(value)
                              : value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Grid>
  )
    // <Box className={classes.root}>
        /* <Box>
            <ToggleFilter
              filter={filter}
              onChange={handleFilterChange}
              onSearchChange={handleSearchChange}/>
        </Box>
        {loading && <LinearProgress className={classes.loading} />}
        <Box className={pagination._totalRows > pagination._limit ? classes.main_body_with_pagination : classes.main_body_without_pagination} style={{marginTop: loading ? '0px' : '30px' }}>
          {
            ApiList?.length ? <ApiListData 
            apiList={ApiList}
            onEdit={handleEditApi}
            onRemove={handleRemoveApi}
          /> : <EmptyData />
          }
        </Box>
        {
          pagination._totalRows > pagination._limit ?
          <Box className={classes.pagination} justifyContent="center">
              <Stack spacing={2} style={{ alignItems: 'center' }}>
                <Pagination 
                  count={Math.ceil(pagination?._totalRows / pagination?._limit)}
                  // page={pagination?._page}
                  onChange={handlePageChange}
                  color="primary" />
              </Stack>
          </Box>
          : null
        }
        <Fab color="primary" onClick={handleClick} className={classes.floatAddBtn} aria-label="add">
          <AddIcon />
        </Fab>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
        >
          <List className={classes.popoverList} component="nav" aria-label="mailbox folders">
            <ListItem button divider>
              <Link to={`${match.url}/create`} className={classes.popoverLink}>
                <ListItemButton>
                  <ListItemIcon>
                    <BorderColorIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('Add API')} />
                </ListItemButton>
              </Link>
            </ListItem>
            <ListItem button>
              <Link to={`${match.url}/add-link`} className={classes.popoverLink}>
                <ListItemButton>
                  <ListItemIcon>
                    <FileOpenIcon />
                  </ListItemIcon>
                  <ListItemText primary={t('Add API from link')} />
                </ListItemButton>
              </Link>
            </ListItem>
          </List>
        </Popover> */
    // </Box>
}