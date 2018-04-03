import React from 'react'
import {func, shape} from 'prop-types'
import Button from '@instructure/ui-core/lib/components/Button'
import Link from '@instructure/ui-core/lib/components/Link'

class ActivityLink extends React.PureComponent {
  static contextTypes = {
    routing: shape({
      getActivity: func.isRequired,
      pushLocation: func.isRequired,
      replaceLocation: func.isRequired
    })
  }

  constructor(props, context) {
    super(props, context)

    this.handleClick = event => {
      event.preventDefault()
      if (this.props.replace) {
        this.context.routing.replaceLocation(this.props.href)
      } else {
        this.context.routing.pushLocation(this.props.href)
      }
    }
  }

  render() {
    const {as, children, ...props} = this.props
    if (as === 'button') {
      return (
        <Button {...props} onClick={this.handleClick}>
          {children}
        </Button>
      )
    } else {
      return (
        <Link {...props} onClick={this.handleClick}>
          {children}
        </Link>
      )
    }
  }
}

export default ActivityLink
