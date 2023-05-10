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
    fileList: [];
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
  const FileList: React.FC<FileUploadProps> = ({ fileList }) => {
    const { t } = useTranslation()
    // Form Context
  
    // State with useState()
    // const [singleFile, setSingleFile] = useState<File[]>([]);

  
    // remove multiple images
    // const fileRemove = async (file: File) => {
    //   fileRef.current.value = null;
    //   const updatedList = [...fileList];
    //   updatedList.splice(fileList.indexOf(file), 1);
    //   await onChange?.(updatedList);
    //   setFileList(updatedList);
    // };
  
    // remove single image
    const fileSingleRemove = async () => {
    //   fileRef.current.value = null;
    //   await onChange?.([]);
    //   setSingleFile([]);
    };
  
    // Reset the State
    
    // Calculate Size in KiloByte and MegaByte
    type CustomType = 'application/x-yaml';
    const calcSize = (size: number) => {
    return size < 1000000
        ? `${Math.floor(size / 1000)} KB`
        : `${Math.floor(size / 1000000)} MB`;
    };
    // Actual JSX
    return (
      <>
        {/* Image Preview */}
        {fileList?.length > 0 ? (
          <Stack spacing={2} sx={{ my: 2 }}>
            {fileList.map((item, index) => {
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
                      <Typography>{item?.name}</Typography>
                      <Typography variant='body2'>
                        {calcSize(item?.size)}
                      </Typography>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => {
                        fileSingleRemove();
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
  
  export default FileList;
  