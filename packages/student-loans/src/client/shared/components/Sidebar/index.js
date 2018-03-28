import React, {Component} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import List, {ListItem} from '@instructure/ui-core/lib/components/List'
import themeable from '@instructure/ui-themeable'

import ActivityLink from '../ActivityLink'
import router from '../../../router'
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

        <footer className={styles.Sidebar__Footer} />
      </Container>
    )
  }
}

export default themeable(theme, styles)(Sidebar)
