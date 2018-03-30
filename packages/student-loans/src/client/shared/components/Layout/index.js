import React, {Component} from 'react'
import Spinner from '@instructure/ui-core/lib/components/Spinner'
import themeable from '@instructure/ui-themeable'
import 'normalize.css'

import '../../../../shared/theme'
import AuthConsumer from '../../state/AuthConsumer'
import Sidebar from '../Sidebar'
import styles from './styles.css'

class Layout extends Component {
  static defaultProps = {
    sidebar: true
  }

  render() {
    return (
      <AuthConsumer>
        {auth => {
          if (auth.isInitialized()) {
            return (
              <div className={styles.Layout__Container}>
                {this.props.sidebar && <Sidebar />}

                <main className={styles.Layout__Main}>{this.props.children}</main>
              </div>
            )
          }

          return <Spinner title="Loading" />
        }}
      </AuthConsumer>
    )
  }
}

export default themeable(null, styles)(Layout)
