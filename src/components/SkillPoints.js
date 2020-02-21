import React from 'react'
import PropTypes from 'prop-types'
import { Typography, FormHelperText } from '@material-ui/core'

export default function SkillPoints({ points, error, helperText }) {
  return (
    <div css={{ padding: '14px 16px' }}>
      <Typography
        variant="body1"
        css={theme => ({
          color: error && theme.palette.error.main
        })}
      >
        <span
          css={theme => ({
            color: error
              ? theme.palette.error.main
              : theme.palette.text.secondary
          })}
        >
          Available Skill Points:{' '}
        </span>
        <span css={{ fontWeight: 'bold' }}>{points}</span>
      </Typography>
      {helperText && (
        <FormHelperText error={error}>{helperText}</FormHelperText>
      )}
    </div>
  )
}

SkillPoints.propTypes = {
  points: PropTypes.number.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.node
}
