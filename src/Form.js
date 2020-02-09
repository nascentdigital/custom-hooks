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

const SKILL_BASE_POINTS = 5

const formFields = [
  { name: 'name', required: true },
  { name: 'class', required: true },
  {
    name: 'skillPoints',
    initialValue: 7,
    validate: value => {
      if (value > 0) {
        return {
          pass: false,
          errorMessage: 'You must spend all skill points.'
        }
      }
      return {
        pass: true
      }
    }
  },
  { name: 'strength', initialValue: SKILL_BASE_POINTS },
  { name: 'dexterity', initialValue: SKILL_BASE_POINTS },
  { name: 'intelligence', initialValue: SKILL_BASE_POINTS }
]

const customReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_FIELD': {
      const { name, value } = action
      return { ...state, [name]: value }
    }
    case 'INCREMENT_SKILL': {
      const { name } = action
      return {
        ...state,
        skillPoints: state.skillPoints - 1,
        [name]: state[name] + 1
      }
    }
    case 'DECREMENT_SKILL': {
      const { name } = action
      return {
        ...state,
        skillPoints: state.skillPoints + 1,
        [name]: state[name] - 1
      }
    }
    default:
      throw new Error('invalid action type for reducer')
  }
}

export default function Form() {
  const [state, dispatch, isValid, errors] = useForm(formFields, {
    customReducer
  })
  const updateField = e => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      name,
      value
    })
  }
  const incrementSkill = name => {
    dispatch({
      type: 'INCREMENT_SKILL',
      name
    })
  }
  const decrementSkill = name => {
    dispatch({
      type: 'DECREMENT_SKILL',
      name
    })
  }

  const [submitted, setSubmitted] = useState(false)
  const [showErrors, setShowErrors] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    if (isValid) {
      setSubmitted(true)
    } else {
      setShowErrors(true)
    }
  }

  return (
    <>
      <h1>DnD Character Creation</h1>
      <form onSubmit={handleSubmit} css={form}>
        <TextField
          name="name"
          label="Name"
          value={state.name}
          onChange={updateField}
          error={showErrors && !!errors.name}
          helperText={showErrors && errors.name}
        />
        <Select
          name="class"
          label="Class"
          options={[
            { label: 'Barbarian', value: 1 },
            { label: 'Cleric', value: 2 },
            { label: 'Ranger', value: 3 },
            { label: 'Rogue', value: 4 },
            { label: 'Sorcerer', value: 5 }
          ]}
          value={state.class}
          onChange={updateField}
          error={showErrors && !!errors.class}
          helperText={showErrors && errors.class}
        />
        <SkillPoints
          points={state.skillPoints}
          error={showErrors && !!errors.skillPoints}
          helperText={showErrors && errors.skillPoints}
        />
        <Skill
          name="strength"
          points={state.strength}
          minPoints={SKILL_BASE_POINTS}
          availablePoints={state.skillPoints}
          onAdd={incrementSkill}
          onRemove={decrementSkill}
        />
        <Skill
          name="dexterity"
          points={state.dexterity}
          minPoints={SKILL_BASE_POINTS}
          availablePoints={state.skillPoints}
          onAdd={incrementSkill}
          onRemove={decrementSkill}
        />
        <Skill
          name="intelligence"
          points={state.intelligence}
          minPoints={SKILL_BASE_POINTS}
          availablePoints={state.skillPoints}
          onAdd={incrementSkill}
          onRemove={decrementSkill}
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
