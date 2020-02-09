import React, { useState } from 'react'
import { css } from '@emotion/core'
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import { TextField } from '@material-ui/core'
import Select from './components/Select'
import { useForm } from './hooks'

const container = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
`

const form = css`
  display: flex;
  flex-direction: column;

  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightBlue
  }
})

const formFields = [
  { name: 'name', required: true },
  { name: 'class', required: true }
]

function Demo() {
  const [state, dispatch, isValid, errors] = useForm(formFields)
  const updateField = e => {
    const { name, value } = e.target
    dispatch({
      type: 'UPDATE_FIELD',
      name,
      value
    })
  }

  const [showErrors, setShowErrors] = useState(false)
  const handleSubmit = e => {
    e.preventDefault()
    setShowErrors(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <div css={container}>
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
        </form>
      </div>
    </ThemeProvider>
  )
}

export default Demo
