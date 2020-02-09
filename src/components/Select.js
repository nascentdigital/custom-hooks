import React from 'react'
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as SelectMUI,
  MenuItem
} from '@material-ui/core'

export default function Select({
  id,
  name,
  label,
  options,
  value,
  onChange,
  error,
  helperText
}) {
  return (
    <FormControl error={error}>
      <InputLabel id={`${id || label}-label`}>{label}</InputLabel>
      <SelectMUI
        id={id}
        name={name}
        labelId={`${id || label}-label`}
        value={value}
        onChange={onChange}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </SelectMUI>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  )
}
