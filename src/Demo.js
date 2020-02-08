import React from 'react'
import { css } from '@emotion/core'

const container = css`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
`

function Demo() {
  return (
    <div css={container}>
      <h1>DnD Character Creation</h1>
    </div>
  )
}

export default Demo
