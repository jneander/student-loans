import React from 'react';

import 'instructure-ui/lib/themes/canvas';
import ApplyTheme from 'instructure-ui/lib/components/ApplyTheme';
import Button from 'instructure-ui/lib/components/Button';
import Container from 'instructure-ui/lib/components/Container';
import Heading from 'instructure-ui/lib/components/Heading';

import styles from 'styles/app.css';
import Header from 'js/components/Header';

ApplyTheme.setDefaultTheme('canvas');

class App extends React.Component {
  state = {
    signedIn: null
  };

  constructor (props) {
    super(props);

    this.signIn = this.signIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  componentDidMount () {
    GoogleClient.initialize().then(() => {
      this.signIn();
    });
  }

  signIn () {
    GoogleClient.signIn().then(() => {
      this.setState({ signedIn: true });
    });
  }

  signOut () {
    GoogleClient.signOut().then(() => {
      this.setState({ signedIn: false });
    });
  }

  render () {
    return (
      <div>
        <Container as="header" className={styles.Header}>
          <Heading level="h1">Student Loans</Heading>

          {
            this.state.signedIn ? (
              <Button variant="primary" onClick={this.signOut}>Sign Out</Button>
            ) : (
              <Button
                disabled={this.state.signedIn == null}
                onClick={this.signIn}
                variant="primary"
              >
                Sign In
              </Button>
            )
          }
        </Container>

        <div className={styles.Body}>
          <main className={styles.Content}>
          </main>
        </div>
      </div>
    );
  }
}

export default App;
