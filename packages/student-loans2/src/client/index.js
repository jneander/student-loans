import React, {PureComponent} from 'react'
import Heading from '@instructure/ui-elements/lib/components/Heading'
import canvas from '@instructure/ui-themes/lib/canvas'

import 'normalize.css'
import './styles.css'

canvas.use()

export default class Client extends PureComponent {
  render() {
    return (
      <div>
        <Heading level="h1">Student Loans</Heading>
      </div>
    )
  }
}
