import apiManagement from 'api/apiManagement';
import { Api } from 'models';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

export default function EditApiPage() {
  const history = useHistory();
  const classes = useStyles();
  const [loading, setLoading] = useState<Boolean>(false)
  const { apiId } = useParams<{ apiId: string }>();
  const {t} = useTranslation()
  const [api, setApi] = useState<Api>();
  useEffect(() => {
    if (!apiId) return;
    (async () => {
      try {
          if (!apiId) return;
        const response = await apiManagement.show(apiId);
        setApi(response.data.data);
      } catch (error) {
        console.log('Failed to fetch api details', error);
      }
    })();
  }, [apiId]);
  const handleApiFormSubmit = async (formValues: any) => {
    setLoading(false)
    await apiManagement.update(apiId, formValues);
    setLoading(true)
    toast.success(t('Save api successfully!'));

    // Redirect back to api list
    history.push('/open-api/apis');
  };

  const getPlanPropertyValue = (plans: [], key: string) => { 
    if (plans && plans.length) {
        let plan = plans[0];
        return plan[key]
    }

    return null
  };
  const getRateLimitPropertyValue = (plans: [], key: string) => { 
    if (plans && plans.length) {
        let flows = plans[0]['flows'];
        let flow = flows[0]
        let value = flow['pre'][0]['configuration']['rate'][key]
        return value
    }

    return null
  };
  const getQuotaLimitPropertyValue = (plans: [], key: string) => { 
    if (plans && plans.length) {
        let flows = plans[0]['flows'];
        let flow = flows[0]
        let value = flow['pre'][1]['configuration']['quota'][key]
        return value
    }

    return null
  };
  const initialValues: Api = {
    name: api?.name,
	system: api?.system,
	context_path: api?.definition?.proxy?.context_path,
	version: api?.version,
	description: api?.description,
	link: api?.definition?.proxy?.endpoints[0]['target'],
	plan_name: getPlanPropertyValue(api?.definition?.plans, 'name'),
	security: getPlanPropertyValue(api?.definition?.plans, 'security'),
	plan_description: getPlanPropertyValue(api?.definition?.plans, 'description'),
	rate_limit: getRateLimitPropertyValue(api?.definition?.plans, 'limit'),
	rate_period_time: getRateLimitPropertyValue(api?.definition?.plans, 'periodTime'),
	rate_period_time_unit: getRateLimitPropertyValue(api?.definition?.plans, 'periodTimeUnit'),
	quota_limit: getQuotaLimitPropertyValue(api?.definition?.plans, 'limit'),
	quota_period_time: getQuotaLimitPropertyValue(api?.definition?.plans, 'periodTime'),
	quota_period_time_unit: getQuotaLimitPropertyValue(api?.definition?.plans, 'periodTimeUnit'),
    ...api,
  } as Api;


  return (
    <Box className={classes.wrapper_container}>
      {loading && <LinearProgress className={classes.loading} />}
      {(Boolean(apiId)) && api && (
        <ApiForm initialValues={initialValues} apiId={apiId} apiEdit={api} onSubmit={handleApiFormSubmit} />
      )}
    </Box>
  );
}
