import {createProject, deleteProject, getProjectList} from './ProjectApi'

export const LOAD_PROJECTS_FAILURE = Symbol('LOAD_PROJECTS_FAILURE')
export const LOAD_PROJECTS_STARTED = Symbol('LOAD_PROJECTS_STARTED')
export const LOAD_PROJECTS_SUCCESS = Symbol('LOAD_PROJECTS_SUCCESS')

export default class Projects {
  constructor(store) {
    this._store = store

    this._store.setState({
      projects: {
        loadProjectsStatus: null,
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

  areProjectsLoaded() {
    return this._get().loadProjectsStatus === LOAD_PROJECTS_SUCCESS
  }

  areProjectsLoading() {
    return this._get().loadProjectsStatus === LOAD_PROJECTS_STARTED
  }

  loadProjects() {
    setTimeout(() => {
      this._update({loadProjectsStatus: LOAD_PROJECTS_STARTED})
      getProjectList()
        .then(files => {
          this._update({loadProjectsStatus: LOAD_PROJECTS_SUCCESS, projects: files})
        })
        .catch(() => {
          this._update({loadProjectsStatus: LOAD_PROJECTS_FAILURE})
        })
    })
  }

  getProjectList() {
    return this._get().projects
  }

  getProject(projectId) {
    return this._get().projects.find(project => project.id === projectId)
  }

  createProject(attr) {
    setTimeout(() => {
      createProject(attr || {}).then(project => {
        const projects = [...this._get().projects, project]
        this._update({projects})
      })
    })
  }

  deleteProject(projectId) {
    setTimeout(() => {
      deleteProject(projectId).then(() => {
        const projects = this._get().projects.filter(project => project.id !== projectId)
        this._update({projects})
      })
    })
  }
}
