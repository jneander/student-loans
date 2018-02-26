import React, {PureComponent} from 'react'
import {Provider} from 'react-redux'
import canvas from '@instructure/ui-themes/lib/canvas'

import AuthService from '../shared/auth/AuthService'
import Header from '../shared/components/Header'
import * as Actions from './Actions'
import createStore from './createStore'

import 'normalize.css'
import './styles.css'

canvas.use()

export default class App extends PureComponent {
  constructor(props) {
    super(props)

    this.store = createStore()
    AuthService.create(this.store)
  }

  componentWillMount() {
    this.store.dispatch(Actions.initialize())
  }

  render() {
    return (
      <Provider store={this.store}>
        <div>
          <Header />
        </div>
      </Provider>
    )
  }
}
