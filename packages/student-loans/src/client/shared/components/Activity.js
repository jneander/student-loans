import React, {Component} from 'react'

import {createConsumer} from '../state/StateProvider'

const RoutingConsumer = createConsumer(state => ({activity: state.routing.getActivity()}))

export default function Activity(props) {
  return (
    <RoutingConsumer>
      {({activity}) => {
        if (props.name != null && props.name === activity.name) {
          return <div>{props.children}</div>
        }

        if (props.names.includes(activity.name)) {
          return <div>{props.children}</div>
        }

        if (props.context && activity.contexts.includes(props.context)) {
          return <div>{props.children}</div>
        }

        return null
      }}
    </RoutingConsumer>
  )
}

Activity.defaultProps = {
  name: null,
  names: [],
  context: null
}
