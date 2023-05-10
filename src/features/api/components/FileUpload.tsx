import {
    Box,
    FormHelperText,
    IconButton,
    Stack,
    Typography,
  } from '@mui/material';
  import { styled } from '@mui/material/styles';
  import React, { useCallback, useEffect, useRef, useState } from 'react';
  import DeleteIcon from '@mui/icons-material/Delete';
  import uploadImg from '../../../assets/images_default_icons/cloud-upload.png';
  import { ImageConfig } from './FileConfig';
  import { Controller, useController, useForm } from 'react-hook-form';
  import { useTranslation } from 'react-i18next';
  import { toast } from 'react-toastify';
  
  interface FileUploadProps {
    limit: number;
    multiple: boolean;
    name: string;
    onChange?: (file: File[]) => void
  }
  
  // Custom Styles for the Box Component
  const CustomBox = styled(Box)({
    '&.MuiBox-root': {
      backgroundColor: '#fff',
      borderRadius: '2rem',
      boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
      padding: '1rem',
    },
    '&.MuiBox-root:hover, &.MuiBox-root.dragover': {
      opacity: 0.6,
    },
  });
  
  // FileUpload Component
  const FileUpload: React.FC<FileUploadProps> = ({ limit, multiple, name, onChange }) => {
    const { t } = useTranslation()
    // Form Context
    const {
      control,
      formState: { isSubmitting, errors },
    } = useForm();
  
    // State with useState()
    const { field } = useController({ name, control });
    const [singleFile, setSingleFile] = useState<File[]>([]);
    const [fileList, setFileList] = useState<File[]>([]);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const fileRef = useRef<HTMLInputElement>(null);

  
    // Toggle the dragover class
    const onDragEnter = () => wrapperRef.current?.classList.add('dragover');
    const onDragLeave = () => wrapperRef.current?.classList.remove('dragover');
  
    // Image Upload Service
    const onFileDrop = useCallback(
      async (e: React.SyntheticEvent<EventTarget>) => {
        const target = e.target as HTMLInputElement;
        if (!target.files) return;
        
        if (limit === 1) {
          const newFile = Object.values(target.files).map((file: File) => file);
          if (singleFile.length >= 1) return toast.error(t('Only a single file allowed'));
          if (!['application/x-yaml'].includes(newFile[0].type)) {
            setSingleFile([]);
            return toast.error(t('Only support yaml type'));
          }
          setSingleFile(newFile);
          await onChange?.(newFile);
          field.onChange(newFile[0]);

        }
  
        if (multiple) {
          const newFiles = Object.values(target.files).map((file: File) => file);
          if (newFiles) {
            const updatedList = [...fileList, ...newFiles];
            if (updatedList.length > limit || newFiles.length > limit) {
              return toast.error(t(`${t('Files must not be more than')} ${limit}`));
            }
            setFileList(updatedList);
            await onChange?.(updatedList);
            field.onChange(updatedList);
          }
        }
      },
      [field, fileList, limit, multiple, singleFile]
    );
  
    // remove multiple images
    const fileRemove = async (file: File) => {
      fileRef.current.value = null;
      const updatedList = [...fileList];
      updatedList.splice(fileList.indexOf(file), 1);
      await onChange?.(updatedList);
      setFileList(updatedList);
    };
  
    // remove single image
    const fileSingleRemove = async () => {
      fileRef.current.value = null;
      await onChange?.([]);
      setSingleFile([]);
    };
  
    // TypeScript Type
    type CustomType = 'application/x-yaml';
  
    // Calculate Size in KiloByte and MegaByte
    const calcSize = (size: number) => {
      return size < 1000000
        ? `${Math.floor(size / 1000)} KB`
        : `${Math.floor(size / 1000000)} MB`;
    };
  
    // Reset the State
    useEffect(() => {
      if (isSubmitting) {
        setFileList([]);
        setSingleFile([]);
      }
    }, [isSubmitting]);
  
    // Actual JSX
    return (
      <>
        <CustomBox>
          <Box
            display='flex'
            justifyContent='center'
            alignItems='center'
            sx={{
              position: 'relative',
              width: '100%',
              height: '13rem',
              border: '2px dashed #4267b2',
              borderRadius: '20px',
            }}
            ref={wrapperRef}
            onDragEnter={onDragEnter}
            onDragLeave={onDragLeave}
            onDrop={onDragLeave}
          >
            <Stack justifyContent='center' sx={{ p: 1, textAlign: 'center' }}>
              <Typography sx={{ color: '#ccc' }}>
                {limit > 1 ? t('Browse files to upload') : t('Browse file to upload')}
              </Typography>
              <div>
                <img
                  src={uploadImg}
                  alt={t('File upload')}
                  style={{ width: '5rem' }}
                />
              </div>
              <Typography variant='body1' component='span'>
                <strong>{t('Supported Files')}</strong>
              </Typography>
              <Typography variant='body2' component='span'>
                YAML
              </Typography>
            </Stack>
            <Controller
              name={name}
              defaultValue=''
              control={control}
              render={({ field: { name, onBlur } }) => (
                <input
                  type='file'
                  name={name}
                  onBlur={onBlur}
                  ref={fileRef}
                  onChange={onFileDrop}
                  onClick={onFileDrop}
                  multiple={multiple}
                  // accept='image/jpg, image/png, image/jpeg'
                  accept='application/x-yaml'
                  style={{
                    opacity: 0,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                  }}
                />
              )}
            />
          </Box>
        </CustomBox>
  
        <FormHelperText
          sx={{ textAlign: 'center', my: 1 }}
          error={!!errors[name]}
        >
          {errors[name] ? (errors[name]?.message as unknown as string) : ''}
        </FormHelperText>
  
        {/* Image Preview */}
        {fileList.length > 0 || singleFile.length > 0 ? (
          <Stack spacing={2} sx={{ my: 2 }}>
            {(multiple ? fileList : singleFile).map((item, index) => {
              const imageType = item.type.split('/')[1] as CustomType;
              return (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    backgroundColor: '#f5f8ff',
                    borderRadius: 1.5,
                    p: 0.5,
                  }}
                >
                  <Box display='flex'>
                    <img
                      src={ImageConfig[`${imageType}`] || ImageConfig['default']}
                      alt='upload'
                      style={{
                        height: '3.5rem',
                        objectFit: 'contain',
                      }}
                    />
                    <Box sx={{ ml: 1 }}>
                      <Typography>{item.name}</Typography>
                      <Typography variant='body2'>
                        {calcSize(item.size)}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => {
                      if (multiple) {
                        fileRemove(item);
                      } else {
                        fileSingleRemove();
                      }
                    }}
                    sx={{
                      color: '#df2c0e',
                      position: 'absolute',
                      right: '1rem',
                      top: '50%',
                      transform: 'translateY(-50%)',
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Box>
              );
            })}
          </Stack>
        ) : null}
      </>
    );
  };
  
  export default FileUpload;
  