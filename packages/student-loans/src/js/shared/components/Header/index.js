import React, {PureComponent} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Grid, {GridCol, GridRow} from '@instructure/ui-core/lib/components/Grid'
import Heading from '@instructure/ui-core/lib/components/Heading'
import Link from '@instructure/ui-core/lib/components/Link'

import styles from './styles.css'

export default class Header extends PureComponent {
  render() {
    return (
      <Container as="header" className={styles.Header}>
        <Grid vAlign="middle" colSpacing="none">
          <GridRow>
            <GridCol>
              <Heading level="h1">
                <Link href="#">Student Loans</Link>
              </Heading>
            </GridCol>
          </GridRow>
        </Grid>
      </Container>
    )
  }
}
