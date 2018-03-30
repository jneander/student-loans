import React, {Component} from 'react'
import Button from '@instructure/ui-core/lib/components/Button'
import Container from '@instructure/ui-core/lib/components/Container'
import List, {ListItem} from '@instructure/ui-core/lib/components/List'
import themeable from '@instructure/ui-themeable'

import router from '../../../router'
import AuthConsumer from '../../state/AuthConsumer'
import ActivityLink from '../ActivityLink'
import styles from './styles.css'
import theme from './theme'

class Sidebar extends Component {
  render() {
    return (
      <Container as="div" className={styles.Sidebar}>
        <header className={styles.Sidebar__Header}>
          <ActivityLink href={router.urls.homeUrl()} variant="inverse">
            <span className={styles.Logo}>Author</span>
          </ActivityLink>
        </header>

        <nav className={styles.Sidebar__Nav}>
          <List variant="unstyled" margin="small">
            <ListItem>
              <ActivityLink href={router.urls.listProjectsUrl()} variant="inverse">
                Projects
              </ActivityLink>
            </ListItem>
          </List>
        </nav>

        <footer className={styles.Sidebar__Footer}>
          <AuthConsumer>
            {auth =>
              auth.isSignedIn() ? (
                <Container as="div" padding="small">
                  <Button fluidWidth onClick={auth.signOut} variant="light">
                    Sign Out
                  </Button>
                </Container>
              ) : null
            }
          </AuthConsumer>
        </footer>
      </Container>
    )
  }
}

export default themeable(theme, styles)(Sidebar)
