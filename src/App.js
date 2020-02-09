import React from 'react'
import { css } from '@emotion/core'
import { ThemeProvider as EmotionThemeProvider } from 'emotion-theming'
import {
  ThemeProvider as MuiThemeProvider,
  createMuiTheme
} from '@material-ui/core/styles'
import lightBlue from '@material-ui/core/colors/lightBlue'
import Form from './Form'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: lightBlue
  }
})

const container = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: ${theme.palette.text.primary};
`

export default function App() {
  return (
    <EmotionThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <div css={container}>
          <Form />
        </div>
      </MuiThemeProvider>
    </EmotionThemeProvider>
  )
}
