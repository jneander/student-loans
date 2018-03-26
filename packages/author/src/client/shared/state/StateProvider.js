import React, {Component} from 'react'
import createReactContext from 'create-react-context'

import Store from '../../Store'
import Auth from './Auth'
import Projects from './Projects'
import Routing from './Routing'

const {Consumer, Provider} = createReactContext()

export default class StateProvider extends Component {
  constructor(props) {
    super(props)

    this.store = new Store()

    this.accessors = {
      auth: new Auth(this.store),
      projects: new Projects(this.store),
      routing: new Routing(this.store)
    }

    this.store.subscribe(() => {
      this.setState({})
    })
  }

  componentDidMount() {
    this.accessors.auth.initialize()
    this.accessors.projects.initialize()
    this.accessors.routing.initialize()
  }

  componentWillUnmount() {
    this.accessors.auth.uninitialize()
    this.accessors.projects.uninitialize()
    this.accessors.routing.uninitialize()
  }

  render() {
    return <Provider value={{...this.accessors}}>{this.props.children}</Provider>
  }
}

export function createConsumer(mapStateToProps) {
  return class StateConsumer extends Component {
    render() {
      return <Consumer>{accessors => this.props.children(mapStateToProps(accessors))}</Consumer>
    }
  }
}

export function connectConsumer(ConsumingComponent, mapStateToProps) {
  return class StateConsumer extends Component {
    render() {
      return (
        <Consumer>
          {accessors => <ConsumingComponent {...this.props} {...mapStateToProps(accessors)} />}
        </Consumer>
      )
    }
  }
}
