import React from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'

import ActivityLink from '../ActivityLink'

export default function ActionBar(props) {
  const {actions, ...containerProps} = props

  return (
    <Container {...containerProps} as="div">
      {props.actions.map((action, index) => {
        const {label, ...props} = action
        const isLast = index === actions.length - 1
        const margin = isLast ? '0' : '0 small 0 0'

        if (props.href) {
          return (
            <ActivityLink as={Button} key={label} {...props} margin={margin}>
              {label}
            </ActivityLink>
          )
        }

        return (
          <Button key={label} {...props} margin={margin}>
            {label}
          </Button>
        )
      })}
    </Container>
  )
}
