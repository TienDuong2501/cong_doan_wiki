import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import { FormHelperText } from '@material-ui/core';
import * as React from 'react';
import { Control, useController } from 'react-hook-form';

export interface CheckboxFieldProps {
  name: string;
  control: Control<any>;
  label: string;
  disabled?: boolean;
  labelPlacement: 'end'|'start'|'top'|'bottom';
}

export function CheckboxField({ name, control, label, disabled, labelPlacement }: CheckboxFieldProps) {
  const {
    field: { value, onChange },
    fieldState: { invalid, error },
  } = useController({
    name,
    control,
  });

  return (
    <FormControl disabled={disabled} margin="normal" component="fieldset" error={invalid}>
      <FormControlLabel
          onChange={onChange}
          name={name}
          control={<Checkbox color="primary" defaultChecked/>}
          label={label}
          labelPlacement={labelPlacement}
        />
    </FormControl>
  );
}