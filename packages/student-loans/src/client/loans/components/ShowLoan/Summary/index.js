import React, {PureComponent} from 'react'
import Text from '@instructure/ui-core/lib/components/Text'

export default function Summary(props) {
  return (
    <div>
      <Text>{props.loan.id}</Text>
      <Text>{props.loan.name}</Text>
    </div>
  )
}
