import apiManagement from 'api/apiManagement';
import { Api } from 'models';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import ApiForm from '../components/ApiForm';
import { useTranslation } from 'react-i18next';
import { Box, makeStyles, LinearProgress } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	wrapper_container: {
		height: '100%',
		background: '#FAFAFBFF',
    boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
    padding: theme.spacing(2, 3),
    borderRadius: '10px'
	},
  loading: {
    width: '100%',
    borderRadius: '20px'
  },
}));

export default function CreateApiPage() {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState<Boolean>(false)
  const {t} = useTranslation()

  const handleApiFormSubmit = async (formValues: any) => {
    setLoading(false)
    await apiManagement.add(formValues);
    setLoading(true)
    toast.success(t('Save api successfully!'));

    // Redirect back to api list
    history.push('/open-api/apis');
  };

  const initialValues: Api = {} as Api;

  return (
    <Box className={classes.wrapper_container}>
      {loading && <LinearProgress className={classes.loading} />}
      <ApiForm initialValues={initialValues} onSubmit={handleApiFormSubmit} />
    </Box>
  );
}
