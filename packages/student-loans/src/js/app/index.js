import React, {PureComponent} from 'react'
import canvas from '@instructure/ui-themes/lib/canvas'

import Header from '../shared/components/Header'

import 'normalize.css'
import './styles.css'

canvas.use()

export default class App extends PureComponent {
  render() {
    return (
      <div>
        <Header />
      </div>
    )
  }
}
