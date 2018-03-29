import {createProject, deleteProject, getProjectList} from './ProjectApi'

export default class Projects {
  constructor(store) {
    this._store = store

    this._store.setState({
      projects: {
        projects: []
      }
    })

    this._get = () => this._store.getState().projects

    this._update = state => {
      const {projects} = this._store.getState()
      this._store.setState({
        projects: {...projects, ...state}
      })
    }

    this.loadProjects = this.loadProjects.bind(this)
  }

  initialize() {}

  uninitialize() {}

  loadProjects() {
    getProjectList().then(files => this._update({projects: files}))
  }

  getProjectList() {
    return this._get().projects
  }

  getProject(projectId) {
    return this._get().projects.find(project => project.id === projectId)
  }

  createProject(attr) {
    createProject(attr || {}).then(project => {
      const projects = [...this._get().projects, project]
      this._update({projects})
    })
  }

  deleteProject(projectId) {
    deleteProject(projectId).then(() => {
      const projects = this._get().projects.filter(project => project.id !== projectId)
      this._update({projects})
    })
  }
}
