import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, CircularProgress, Grid, makeStyles, Typography } from '@material-ui/core';
import { Info } from '@material-ui/icons';
import { GridView, ViewSidebar, InsertDriveFile } from '@mui/icons-material';
import { InputField, SelectField, TextAreaField } from 'components/FormFields';
import { Link } from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { Api } from '../../../models'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import Divider from '@mui/material/Divider';
import { useTranslation } from 'react-i18next';
import FileUpload from './FileUpload';

export interface ApiFormProps {
  initialValues?: Api;
  apiId?: string;
  apiEdit?: Api;
  onSubmit?: (formValues: Api) => void;
}

interface ApiFormValues {
	id: number | string;
	status: string;
	fileUploads: []
}

function checkError(error : any) {
  switch (error?.status) {
    case 422:
      return error.data.data.errors
  
    default:
      return null
  }
}

const useStyles = makeStyles((theme) => ({
    form_create: {
      width: '100%',
    },
    formated_divider: {
        margin: '20px !important',
        borderColor: '#e3e4e7 !important'
    },
    formated_icon: {
        fill: '#7D76CFFF !important',
    },
    title_partition: {
        display: 'flex', 
        alignItems: 'center',
        color: '#323842FF',
        fontSize: '17px',
        lineHeight: '28px'
    }
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .max(100, 'The API name may not be greater than 100 characters.')
    .required('Please enter API name.'),
	system: yup
			.string()
			.max(100, 'The system may not be greater than 100 characters.')
			.required('Please enter system.'),
	context_path: yup
			.string()
			.max(100, 'The context path may not be greater than 100 characters.')
			.required('Please enter context path.'),
	version: yup
			.string()
			.max(30, 'The version may not be greater than 30 characters.')
			.required('Please enter version.'),
	description: yup
			.string()
			.max(1000, 'The description may not be greater than 1000 characters.')
			.required('Please enter description.'),
	link: yup
			.string()
			.max(500, 'The link may not be greater than 500 characters.')
			.required('Please enter link.')
			.url('Link must be a valid HTTP or HTTPS URL.'),
	plan_name: yup
			.string()
			.max(100, 'The plan name may not be greater than 100 characters.')
			.required('Please enter plan name.'),
	security: yup
			.string()
			.max(100, 'The security may not be greater than 100 characters.')
			.required('Please enter security.'),
	plan_description: yup
			.string()
			.max(1000, 'The plan description may not be greater than 1000 characters.')
			.required('Please enter plan description.'),
});

export default function ApiForm({ initialValues, apiId, apiEdit, onSubmit }: ApiFormProps) {
  const classes = useStyles();
  const {t} = useTranslation()
  const [fileUploads, setFileUpload] = useState<[]>([]);
  const [error, setError] = useState<any>([]);
	
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Api>({
    defaultValues: initialValues,
    resolver: yupResolver(schema),
  });

  const handleFormSubmit = async (formValues: ApiFormValues) => {
    try {
			formValues.fileUploads = fileUploads;
			let payload =  await setPayload(formValues);
      await onSubmit?.(payload);
      setFileUpload([])
			setError([]);
    } catch (errors: any) {
			setFileUpload([])
      setError(checkError(errors?.response));
    }
  };
	const readYamlContentFile = async (file: File) => {
		return new Promise((resolve, reject) => {
				const fileReader = new FileReader();
				fileReader.readAsText(file, "UTF-8");
				fileReader.onload = (event) => {
						const content = event?.target?.result;
						resolve(JSON.stringify(content));
				};
		})
	}

  const setPayload = async(formValues: any) => {
		let contentFile = null
		if (formValues.fileUploads.length) {
			contentFile = await readYamlContentFile(formValues.fileUploads[0])
		}
		
    let defaultPayload =  {
			gravitee: "2.0.0",
			proxy: {
				endpoints: [
					{
						name: "default",
						target: formValues.link,
						inherit: true
					}
				],
				context_path: formValues.context_path
			},
			pages: [],
			plans: [
				{
					characteristics: [],
					name: formValues.plan_name,
					security: formValues.security,
					description: formValues.plan_description,
					validation: "AUTO",
					flows: [
						{
							pathoperator: {
								path: "/",
								operator: "STARTS_WITH"
							},
							condition: "",
							pre: [
								{
									name: "Rate limit",
									policy: "rate-limit",
									configuration: {
										rate: {
											limit: formValues.rate_limit,
											periodTime: formValues.rate_period_time,
											periodTimeUnit: formValues.rate_period_time_unit
										}
									}
								},
								{
									name: "Quota",
									policy: "quota",
									configuration: {
										quota: {
											limit: formValues.quota_limit,
											periodTime: formValues.quota_period_time,
											periodTimeUnit: formValues.quota_period_time_unit
										},
										addHeaders: true
									}
								}
							],
							post: []
						}
					],
					status: "STAGING"
				}
			],
			tags: [],
			groups: [],
			name: formValues.name,
			version: formValues.version,
			system: formValues.system,
			description: formValues.description
		}
		if (contentFile) {
			const pageData = {
				name: formValues.fileUploads[0]['name'],
				content: contentFile,
				type: 'SWAGGER',
				published: false
			}
			defaultPayload.pages.push(pageData)
		}

		return defaultPayload
  }
  const handleFileChange = async (formValues: []) => {
    try {
        setFileUpload(formValues)
    } catch (error) {
        setFileUpload([])
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className={classes.form_create}>
        <Grid container spacing={2}>
            <Grid item xs={9}>
                <Typography variant="h4">{apiId ? null : t('Add new api')}</Typography>
                <Box mt={3}>
                    <Box>
                        <Typography variant="caption" className={classes.title_partition}>
                            <Info className={classes.formated_icon}/> { t('General infomation') }
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <InputField name="name" messageError={error?.name && t(error.name)} isError={error?.name ? true : false} required control={control} label="Api name" />
                                <InputField name="system" messageError={error?.system && t(error.system)} isError={error?.system ? true : false} required control={control} label="System" />
                                <InputField name="context_path" messageError={error && error['proxy.context_path'] ? error['proxy.context_path'] : null} isError={error && error['proxy.context_path'] ? true : false} required control={control} label="Context-path" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputField name="version" required control={control} label="Version" />
                                <TextAreaField name="description" messageError={error?.description && t(error.description)} isError={error?.description ? true : false} required minRows={3} maxRows={8} control={control} label="Description"/>
                            </Grid>
                        </Grid>
                        <Divider variant="middle" className={classes.formated_divider}/>
                        <Typography variant="caption" className={classes.title_partition}>
                            <GridView className={classes.formated_icon}/> { t('Gateway') }
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <InputField name="link" messageError={error && error['proxy.endpoints.0.target'] ? error['proxy.endpoints.0.target'] : null} isError={error && error['proxy.endpoints.0.target'] ? true : false} required control={control} label="Link" />
                            </Grid>
                        </Grid>
                        <Divider variant="middle" className={classes.formated_divider}/>
                        <Typography variant="caption" className={classes.title_partition}>
                            <ViewSidebar className={classes.formated_icon} /> { t('Plan') }
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={6}>
                                <InputField name="plan_name" messageError={error && error['plans.0.name'] ? error['plans.0.name'] : null} isError={error && error['plans.0.name'] ? true : false} required control={control} label="Plan name" />
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <SelectField name="security" required messageError={error && error['plans.0.security'] ? error['plans.0.security'] : null} isError={error && error['plans.0.security'] ? true : false} control={control} label="Security" options={[{label: 'OAth2', value: 'OAUTH2'}, {label: 'JWT', value: 'JWT'}, {label: 'API Key', value: 'API_KEY'}, {label: 'Keyless(public)', value: 'KEY_LESS'}]} />
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <TextAreaField name="plan_description" messageError={error && error['plans.0.description'] ? error['plans.0.description'] : null} isError={error && error['plans.0.description'] ? true : false} required minRows={3} maxRows={8} control={control} label="Plan description"/>
                            </Grid>
                        </Grid>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <InputField name="rate_limit" type="number" required messageError={error && error['plans.0.flows.0.pre.0.configuration.rate.limit'] ? error['plans.0.flows.0.pre.0.configuration.rate.limit'] : null} isError={error && error['plans.0.flows.0.pre.0.configuration.rate.limit'] ? true : false} control={control} label="Rate limit" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputField name="rate_period_time" type="number" required messageError={error && error['plans.0.flows.0.pre.0.configuration.rate.periodTime'] ? error['plans.0.flows.0.pre.0.configuration.rate.periodTime'] : null} isError={error && error['plans.0.flows.0.pre.0.configuration.rate.periodTime'] ? true : false} control={control} label="Period time" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SelectField name="rate_period_time_unit" required messageError={error && error['plans.0.flows.0.pre.0.configuration.rate.periodTimeUnit'] ? error['plans.0.flows.0.pre.0.configuration.rate.periodTimeUnit'] : null} isError={error && error['plans.0.flows.0.pre.0.configuration.rate.periodTimeUnit'] ? true : false} control={control} label="Period time unit" options={[{label: 'SECONDS', value: 'SECONDS'}, {label: 'MINUTES', value: 'MINUTES'}]} />
                            </Grid>
                        </Grid>
                        <Typography variant="body2" className={classes.title_partition}>
                            { t('Ex: 1000 requests, 10, SECOND') }
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={4}>
                                <InputField name="quota_limit" type="number" required messageError={error && error['plans.0.flows.0.pre.1.configuration.quota.limit'] ? error['plans.0.flows.0.pre.1.configuration.quota.limit'] : null} isError={error && error['plans.0.flows.0.pre.1.configuration.quota.limit'] ? true : false} control={control} label="Quota limit" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <InputField name="quota_period_time" type="number" required messageError={error && error['plans.0.flows.0.pre.1.configuration.quota.periodTime'] ? error['plans.0.flows.0.pre.1.configuration.quota.periodTime'] : null} isError={error && error['plans.0.flows.0.pre.1.configuration.quota.periodTime'] ? true : false} control={control} label="Quota period time" />
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <SelectField name="quota_period_time_unit" required messageError={error && error['plans.0.flows.0.pre.1.configuration.quota.periodTimeUnit'] ? error['plans.0.flows.0.pre.1.configuration.quota.periodTimeUnit'] : null} isError={error && error['plans.0.flows.0.pre.1.configuration.quota.periodTimeUnit'] ? true : false} control={control} label="Quota period time unit" options={[{label: 'HOURS', value: 'HOURS'}, {label: 'DAYS', value: 'DAYS'}, {label: 'WEEKS', value: 'WEEKS'}, {label: 'MONTHS', value: 'MONTHS'}]} />
                            </Grid>
                        </Grid>
                        <Typography variant="body2" className={classes.title_partition}>
                            { t('Ex: 1000 requests, 10, DAY') }
                        </Typography>
                    </Box>
                </Box>
            </Grid>
            <Grid item xs={3}>
                <Typography variant="caption" className={classes.title_partition}>
                    <InsertDriveFile className={classes.formated_icon}/> {t('Related documentation')}
                </Typography>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <FileUpload limit={1} multiple={false} name='images' onChange={handleFileChange}/>
                    </Grid>
                </Grid>
                <Grid container spacing={2} style={{textAlign: 'center'}}>
                    <Grid item xs={12}>
                    <Button type="submit" variant="contained" style={{marginRight: '5px'}} color="primary" disabled={isSubmitting}>
                        {isSubmitting && <CircularProgress size={16} color="primary" />}
                        &nbsp;
                        { t('Save') }
                    </Button>
                    <Link to="/open-api/apis" style={{ textDecoration: 'none' }}>
                        <Button variant="contained" color="primary" style={{marginLeft: '5px'}} disabled={isSubmitting}>
                                { t('Cancel') }
                        </Button>
                    </Link>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </form>
  );
}
