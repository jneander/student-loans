import React, {Component} from 'react'
import Link from '@instructure/ui-core/lib/components/Link'

import {createConsumer} from '../state/StateProvider'

const RoutingConsumer = createConsumer(state => ({router: state.routing}))

export default class ActivityLink extends Component {
  static defaultProps = {
    as: Link
  }

  render() {
    const createClickHandler = router => event => {
      event.preventDefault()
      router.pushLocation(this.props.href)
    }

    const {as: Component, ...linkProps} = this.props

    return (
      <RoutingConsumer>
        {props => <Component {...linkProps} onClick={createClickHandler(props.router)} />}
      </RoutingConsumer>
    )
  }
}
