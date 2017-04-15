import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import {func, shape} from 'prop-types'
import canvas from '@instructure/ui-themes/lib/canvas'

import Header from '../shared/components/Header'
import Activity from '../shared/components/Activity'
import {createRoutingContext} from '../shared/routing'
import routingPropTypes from '../shared/routing/propTypes'
import RoutingActions from '../shared/routing/RoutingActions'
import Loans from './loans'
import * as Actions from './loans/Actions'
import Settings from './settings'
import createStore from './createStore'

import 'normalize.css'
import './styles.css'

canvas.use()

export default class App extends PureComponent {
  static childContextTypes = {
    routing: routingPropTypes.isRequired
  }

  constructor(props) {
    super(props)

    this.store = createStore()
    this.routing = createRoutingContext(this.store)
  }

  componentWillMount() {
    this.store.dispatch(Actions.initialize())
  }

  getChildContext() {
    return {
      routing: this.routing
    }
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Header />

          <Activity context="loans">
            <Loans />
          </Activity>

          <Activity context="settings">
            <Settings />
          </Activity>
        </div>
      </Provider>
    )
  }
}
