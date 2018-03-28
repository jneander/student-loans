import React, {Component} from 'react'
import themeable from '@instructure/ui-themeable'
import 'normalize.css'

import '../../../../shared/theme'
import Sidebar from '../Sidebar'
import styles from './styles.css'

class Layout extends Component {
  static defaultProps = {
    sidebar: true
  }

  render() {
    return (
      <div className={styles.Layout__Container}>
        {this.props.sidebar && <Sidebar />}

        <main className={styles.Layout__Main}>{this.props.children}</main>
      </div>
    )
  }
}

export default themeable(null, styles)(Layout)
