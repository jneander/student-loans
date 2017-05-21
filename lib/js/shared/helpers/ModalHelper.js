import React from 'react';
import { func } from 'prop-types';

const ModalHelper = {
  createReduxModalClass (ModalClass, createStore) {
    class ReduxModal extends React.PureComponent {
      static get name () {
        return ModalClass.displayName || 'ReduxModal';
      }

      constructor (props) {
        super(props);
        this.state = {
          isOpen: false,
          store: createStore(this.props)
        };
        this.close = this.close.bind(this);
      }

      open () {
        this.setState({
          isOpen: true
        });
      }

      close () {
        this.setState({
          isOpen: false
        }, this.props.onClose);
      }

      render () {
        return (
          <ModalClass
            {...this.props}
            isOpen={this.state.isOpen}
            onClose={this.close}
            store={this.state.store}
          />
        );
      }
    }

    ReduxModal.propTypes = {
      onClose: func
    };

    ReduxModal.defaultProps = {
      onClose () {}
    };

    return ReduxModal;
  }
};

export default ModalHelper;
