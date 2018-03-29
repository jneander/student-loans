import React, {Component} from 'react'
import createReactContext from 'create-react-context'

import Projects from './Projects'

const {Consumer, Provider} = createReactContext()

export class ProjectsProvider extends Component {
  constructor(props) {
    super(props)

    this.state = {
      projects: new Projects(null, projects => {
        this.setState({projects})
      })
    }
  }

  render() {
    return <Provider value={this.state.projects}>{this.props.children}</Provider>
  }
}

export {Consumer as ProjectsConsumer}
