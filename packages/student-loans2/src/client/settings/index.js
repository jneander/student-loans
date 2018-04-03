import React, {PureComponent} from 'react'
import Container from '@instructure/ui-core/lib/components/Container'
import Heading from '@instructure/ui-core/lib/components/Heading'

import SettingAccessor from '../shared/settings/SettingAccessor'

export default class Settings extends PureComponent {
  render() {
    return (
      <Container as="div" textAlign="center" padding="medium 0">
        <Container as="div" size="medium" textAlign="start" margin="0 auto">
          <Container as="header">
            <Heading level="h2">Settings</Heading>
          </Container>
        </Container>
      </Container>
    )
  }
}
