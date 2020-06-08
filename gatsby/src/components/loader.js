import React from 'react'
import loadable from '@loadable/component'

const OtherComponent = loadable(() => import('./OtherComponent'))

function MyComponent(props) {
    props.setItems(require('../data/items.json'))
  return (
    <div>
      <OtherComponent />
    </div>
  )
}