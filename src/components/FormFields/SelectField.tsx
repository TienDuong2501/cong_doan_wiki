import { FormHelperText, MenuItem, Select, makeStyles } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  error: {
    color: '#f44336 !important'
  },
}));

export interface SelectOption {
  label?: string;
  value: number | string;
}

export interface SelectFieldProps {
  name: string;
  control: Control<any>;
  label?: string;
  disabled?: boolean;
  options: SelectOption[];
  messageError?: string;
  isError?: boolean;
  required?: boolean;
}

export function SelectField({ name, control, label, disabled, options, required, messageError, isError }: SelectFieldProps) {
  const { t } = useTranslation()
  const classes = useStyles();
  const {
    field: { value, onChange, onBlur },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl
      fullWidth
      variant="outlined"
      margin="normal"
      size="small"
      disabled={disabled}
      error={invalid}
    >
      <InputLabel required={required} id={`${name}_label`} className={invalid || isError ? classes.error : ''}>{label}</InputLabel>
      <Select
        labelId={`${name}_label`}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        label={label}
        error={invalid || isError}
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>

      <FormHelperText className={classes.error}>{error?.message ? t(`${error?.message}`) : messageError ? t(`${messageError}`) : null}</FormHelperText>
    </FormControl>
  );
}