import apiManagement from 'api/apiManagement';
import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Api } from 'models';
import { useTranslation } from 'react-i18next';
import { Box, Button, makeStyles, Typography, CircularProgress, LinearProgress } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { InputField} from 'components/FormFields';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DescriptionIcon from '@mui/icons-material/Description';
import ApiForm from '../components/ApiForm';
import FileList from '../components/FileList';
import UserList from '../components/UserList';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
const theme = createTheme({
  palette: {
    secondary: {
      // This is green.A700 as hex.
      main: 'rgb(211, 47, 47)',
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
	boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
	borderRadius: '10px'
}));

const useStyles = makeStyles((theme) => ({
	formated_icon: {
		fill: '#7D76CFFF !important',
	},
	title_partition: {
		color: '#323842FF',
		fontSize: '17px',
		lineHeight: '28px'
	},
	upload_container: {
		position: 'relative',
		paddingTop: theme.spacing(1),
	},
	wrapper_container: {
		height: '100%',
	},
	item_container: {
		height: 'calc(100vh - 110px)',
		overflow: 'auto',
	},
	btn_actions: {
		margin: '10px'
	}
}));

export default function ShowApiPage() {
  const history = useHistory();
	const classes = useStyles();
  const {t} = useTranslation()
  const [activeTab, setValue] = React.useState('1');
	const [loading, setLoading] = useState<Boolean>(false)
  const [fileUploads, setFileUpload] = useState<[]>([]);
	const [errors, setError] = useState<any>([]);
	const { apiId } = useParams<{ apiId: string }>();
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

	const schema = yup.object().shape({
		link: yup.string()
		.max(1000, 'Link must be lower or equal 1000 characters.')
		.required('Please enter Link.')
		.url('Link must be a valid HTTP or HTTPS URL.'),
	});
  const schemaUpload = yup.object().shape({
	});
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
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm({
    resolver: yupResolver(activeTab === '1' ? schemaUpload : schema),
  });

  return (
		<Box className={classes.wrapper_container}>
			<Box className={classes.upload_container}>
				<Grid container spacing={3} sx={{ flexGrow: 1 }}>
					<Grid xs md={12}>
						<Item className={classes.item_container}>
							<Box>
								<TabContext value={activeTab}>
										<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
										<Typography variant="h6" className={classes.title_partition}>
												{ t('Add API swagger/Open API') }
										</Typography>
											<TabList onChange={handleChangeTab} centered>
												<Tab label={ t('Detail infomation') } style={{padding: '10px'}} wrapped value="1" />
												<Tab label={t('Related documentations')} style={{padding: '10px'}} wrapped value="2" />
												<Tab label={t('User management')} style={{padding: '10px'}} wrapped value="3" />
											</TabList>
										</Box>
										{/* Tab edit API */}
										<TabPanel value="1">
										<Box className={classes.wrapper_container}>
											{loading && <LinearProgress className={classes.loading} />}
											{(Boolean(apiId)) && api && (
												<div>
													<ApiForm initialValues={initialValues} apiId={apiId} apiEdit={api} onSubmit={handleApiFormSubmit} />
													<ThemeProvider theme={theme}>
														<Button variant="contained" color="primary" className={classes.btn_actions}>{t('Stop API')}</Button>
														<Button variant="contained" color="primary" className={classes.btn_actions}>{t('Publish API')}</Button>
														<Button variant="contained" color="primary" className={classes.btn_actions}>{t('Make private')}</Button>
														<Button variant="contained" color="secondary" className={classes.btn_actions}>{t('Delete')}</Button>
													</ThemeProvider>
												</div>
											)}
										</Box>
										</TabPanel>
										{/* Tab list files swagger */}
										<TabPanel value="2">
											<FileList fileList={[{name: 'test', size: 900, type: 'application/x-yaml'}]} />
										</TabPanel>
										{/* Tab list users */}
										<TabPanel value="3">
											<UserList userList={[{username: 'test',firstName: 'test',lastName: 'test', email: 'abc@gmail.com', status: 'ACTIVE'},{username: 'test',firstName: 'test',lastName: 'test', email: 'abc@gmail.com', status: 'ACTIVE'},{username: 'test',firstName: 'test',lastName: 'test', email: 'abc@gmail.com', status: 'ACTIVE'},{username: 'test',firstName: 'test',lastName: 'test', email: 'abc@gmail.com', status: 'ACTIVE'}]} />
										</TabPanel>
								</TabContext>
							</Box>
						</Item>
					</Grid>
				</Grid>
			</Box>
		</Box>
  );
}
