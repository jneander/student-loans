import React from 'react';
import Text from '@instructure/ui-core/lib/components/Text';

export default class extends React.Component {
  render () {
    return (
      <div>
        <Text>{ this.props.loan.id }</Text>
        <Text>{ this.props.loan.name }</Text>
      </div>
    );
  }
}
