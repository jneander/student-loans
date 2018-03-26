import React, {Component} from 'react'
import Link from '@instructure/ui-core/lib/components/Link'
import List, {ListItem} from '@instructure/ui-core/lib/components/List'

import router from '../../router'
import ActivityLink from '../../shared/components/ActivityLink'

export default class ProjectList extends Component {
  render() {
    const {projects, ...props} = this.props

    return (
      <List {...props} variant="unstyled">
        {projects.map((project, index) => (
          <ListItem key={index}>
            <ActivityLink href={router.urls.showProjectUrl(project.id)}>
              {project.name}
            </ActivityLink>
          </ListItem>
        ))}
      </List>
    )
  }
}
