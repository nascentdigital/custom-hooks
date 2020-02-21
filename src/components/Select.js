import React from 'react'
import PropTypes from 'prop-types'
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
  const labelId = `${id || label}-label`
  return (
    <FormControl error={error}>
      <InputLabel id={labelId}>{label}</InputLabel>
      <SelectMUI
        id={id}
        name={name}
        labelId={labelId}
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

Select.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.exact({
      label: PropTypes.string,
      vallue: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func,
  error: PropTypes.bool,
  helperText: PropTypes.node
}

Select.defaultProps = {
  value: '',
  options: []
}
