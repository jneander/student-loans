import {
  createFile,
  deleteFile,
  getFileList,
  updateFile
} from '../../../../shared/wrappers/GoogleApi/files'

export const MIME_TYPE = 'application/x-author-project.jln.io'

export function getProjectList() {
  return getFileList({mimeType: MIME_TYPE}).then(response => {
    return response.result.files
  })
}

export function createProject(attr) {
  return createFile({...attr, mimeType: MIME_TYPE}).then(response => response.result)
}

export function updateProject(projectId, attr) {
  return updateFile(projectId, attr).then(response => response.result)
}

export function deleteProject(projectId) {
  return deleteFile(projectId).then(response => true)
}
