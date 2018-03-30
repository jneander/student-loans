import React, {PureComponent} from 'react'
import createReactContext from 'create-react-context'

import router from '../../router'
import Auth from './Auth'
import Routing from './Routing'

const {Consumer, Provider} = createReactContext()

export default class StateProvider extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      auth: new Auth(null, auth => {
        this.setState({auth})
      }),
      routing: new Routing(router, {}, routing => {
        this.setState({routing})
      })
    }
  }

  componentWillMount() {
    this.state.auth.initialize()
    this.state.routing.initialize()
  }

  componentWillUnmount() {
    this.state.auth.uninitialize()
    this.state.routing.uninitialize()
  }

  render() {
    return <Provider value={this.state}>{this.props.children}</Provider>
  }
}

export function createConsumer(mapStateToProps) {
  return class StateConsumer extends PureComponent {
    render() {
      return <Consumer>{state => this.props.children(mapStateToProps(state))}</Consumer>
    }
  }
}
