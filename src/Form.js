import React, { useState } from 'react'
import { css } from '@emotion/core'
import { TextField, Button } from '@material-ui/core'
import { useForm } from './hooks'
import Select from './components/Select'
import SkillPoints from './components/SkillPoints'
import Skill from './components/Skill'

const form = css`
  display: flex;
  flex-direction: column;
  min-width: 350px;

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }

  > button:last-of-type {
    margin-top: 1rem;
  }
`

const AVAILABLE_POINTS = 7
const SKILL_BASE_POINTS = 5

export default function Form() {
  // TODO - form state / logic / etc.

  const [submitted, setSubmitted] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    // TODO - if form is valid, set 'submitted' to true, otherwise set 'showErrors' to true
  }

  return (
    <>
      <h1>DnD Character Creation</h1>
      <form onSubmit={handleSubmit} css={form}>
        <TextField
          name="name"
          label="Name"
          value={undefined}
          onChange={undefined}
          error={undefined} // passing in true will change the appearance of this input to be in an error state
          helperText={undefined} // either the helper text or the error message if error is true
        />
        <Select
          name="class"
          label="Class"
          options={undefined} // an array of objects with properties label and value
          value={undefined} // the selected value
          onChange={undefined}
          error={undefined}
          helperText={undefined}
        />
        <SkillPoints
          points={undefined} // available points left to spend
          error={undefined}
          helperText={undefined}
        />
        <Skill
          name="strength"
          points={undefined}
          onAdd={undefined}
          onRemove={undefined}
          disableRemove={undefined}
          disableAdd={undefined}
        />
        <Skill
          name="dexterity"
          points={undefined}
          onAdd={undefined}
          onRemove={undefined}
          disableRemove={undefined}
          disableAdd={undefined}
        />
        <Skill
          name="intelligence"
          points={undefined}
          onAdd={undefined}
          onRemove={undefined}
          disableRemove={undefined}
          disableAdd={undefined}
        />
        <Button
          variant="contained"
          color="primary"
          disabled={submitted}
          onClick={handleSubmit}
        >
          {submitted ? 'Submitted' : 'Submit'}
        </Button>
      </form>
    </>
  )
}
