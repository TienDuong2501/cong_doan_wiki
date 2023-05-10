import { TextField } from '@material-ui/core';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface InputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  messageError?: string;
  isError?: boolean;
}

export function InputField({ name, control, label, required, messageError, isError, ...inputProps }: InputFieldProps) {
  const { t } = useTranslation()
  const {
    field: { value, onChange, onBlur, ref },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <TextField
      fullWidth
      size="small"
      margin="normal"
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      label={t(`${label}`)}
      variant="outlined"
      inputRef={ref}
      error={invalid || isError}
      helperText={error?.message ? t(`${error?.message}`) : messageError ? t(`${messageError}`) : null}
      required={required}
      inputProps={inputProps}
    />
  );
}