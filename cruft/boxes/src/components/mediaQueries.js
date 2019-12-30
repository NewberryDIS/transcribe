/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const breakpoints = [576, 768, 992, 1200]

export const mq = breakpoints.map(
  bp => `@media (min-width: ${bp}px)`
)
