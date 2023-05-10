import { TextField } from '@material-ui/core';
import * as React from 'react';
import { InputHTMLAttributes } from 'react';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

export interface TextAreaFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  control: Control<any>;
  label?: string;
  minRows: number;
  maxRows: number;
  messageError?: string;
  isError?: boolean;
}

export function TextAreaField({ name, control, label, minRows, maxRows, required, messageError, isError, ...inputProps }: TextAreaFieldProps) {
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
      minRows={minRows}
      maxRows={maxRows}
      multiline
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