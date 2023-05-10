import apiManagement from 'api/apiManagement';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import { Box, Button, makeStyles, Typography, CircularProgress } from '@material-ui/core';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { InputField} from 'components/FormFields';
import FileUpload from '../components/FileUpload';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DescriptionIcon from '@mui/icons-material/Description';
import { Link } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';

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
		paddingTop: theme.spacing(10),
	},
	wrapper_container: {
		height: '100%',
	}
}));

export default function CreateApiLinkPage() {
  const history = useHistory();
	const classes = useStyles();
  const {t} = useTranslation()
  const [activeTab, setValue] = React.useState('1');
  const [fileUploads, setFileUpload] = useState<[]>([]);
	const [errors, setError] = useState<any>([]);

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const handleFormSubmitUploadFile = async (formValues: any) => {
	if (fileUploads?.length) {
		const contentFile = await readYamlContentFile(fileUploads[0])
		const requestData = {
			with_documentation: true,
			with_path_mapping: true,
			with_policy_paths: false,
			type: "INLINE",
			payload: contentFile,
			format: "API"
		}
		try {
			await apiManagement.importSwagger(requestData);
			toast.success(t('Save api successfully!'));
			history.push('/open-api/apis');
		} catch (error: any) {
			toast.error(t('Import failed!'));
		}
	} else {
		toast.error(t('Import failed!'));
	}
  };
  const handleFormSubmitLink = async (formValues: any) => {
		if (formValues.link) {
			const requestData = {
				with_documentation: true,
				with_path_mapping: true,
				with_policy_paths: false,
				type: "URL",
				payload: formValues.link,
				format: "API"
			}
			try {
				await apiManagement.importUrl(requestData);
				toast.success(t('Save api successfully!'));
				history.push('/open-api/apis');
			} catch (error: any) {
				if (error.response.status === 422) {
					setError(error.response.data.data.errors)
				} else {
					toast.error(t('Import failed!'));
				}
			}
		} else {
			toast.error(t('Import failed!'));
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

  const handleFileChange = async (formValues: []) => {
    try {
        setFileUpload(formValues)
    } catch (error) {
        setFileUpload([])
    }
  };

  const schema = yup.object().shape({
		link: yup.string()
		.max(1000, 'Link must be lower or equal 1000 characters.')
		.required('Please enter Link.')
		.url('Link must be a valid HTTP or HTTPS URL.'),
	});
  const schemaUpload = yup.object().shape({
	});

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
					<Grid xs md={6} mdOffset={3}>
						<Item>
							<Typography variant="h6" className={classes.title_partition}>
									<DescriptionIcon className={classes.formated_icon}/> { t('Add API swagger/Open API') }
							</Typography>
							<Box>
								<TabContext value={activeTab}>
										<Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
											<TabList onChange={handleChangeTab} centered>
												<Tab label={ t('Add file swagger') } style={{padding: '10px'}} wrapped value="1" />
												<Tab label={t('Add link swagger')} style={{padding: '10px'}} wrapped value="2" />
											</TabList>
										</Box>
										{/* Tab upload swagger file */}
										<TabPanel value="1">
											<form key="1" onSubmit={handleSubmit(handleFormSubmitUploadFile)}>
												<FileUpload limit={1} multiple={false} name='images' onChange={handleFileChange}/>
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
											</form>
										</TabPanel>
										{/* Tab add link swagger */}
										<TabPanel value="2">
											<form key="2" onSubmit={handleSubmit(handleFormSubmitLink)}>
												<InputField name="link" messageError={errors?.name && t(errors.name)} isError={errors?.name ? true : false} required control={control} label="Link swagger" />
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
											</form>
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
