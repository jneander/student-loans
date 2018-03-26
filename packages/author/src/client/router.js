import {Router} from '../external/activity-routing'

const router = new Router()

router.add('home', '/')

router.context('projects', '/projects', context => {
  context.add('createProject', '/new')
  context.add('updateProject', '/:projectId/edit')
  context.add('showProject', '/:projectId')
  context.add('listProjects', '(/)')
})

export default router
