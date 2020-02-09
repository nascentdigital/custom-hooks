import React from 'react'
import { css } from '@emotion/core'
import { AddCircle, RemoveCircle } from '@material-ui/icons'
import { Typography, IconButton } from '@material-ui/core'

const container = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
  text-transform: capitalize;
`

export default function Skill({
  name,
  points,
  minPoints,
  onAdd,
  onRemove,
  availablePoints
}) {
  return (
    <div css={container}>
      <IconButton
        name={name}
        aria-label="remove"
        onClick={() => onRemove(name)}
        disabled={points === minPoints}
      >
        <RemoveCircle />
      </IconButton>
      <Typography
        variant="body1"
        css={theme => ({ color: theme.palette.text.secondary })}
      >
        <span>{name}: </span>
        <span
          css={theme => ({
            color: theme.palette.text.primary,
            fontWeight: 'bold'
          })}
        >
          {points}
        </span>
      </Typography>
      <IconButton
        name={name}
        aria-label="add"
        onClick={() => onAdd(name)}
        disabled={availablePoints === 0}
      >
        <AddCircle />
      </IconButton>
    </div>
  )
}
