import GoogleApi from 'google-api'

export function createFile(attr) {
  return new Promise((resolve, reject) => {
    GoogleApi.client.drive.files.create(attr).then(response => {
      if (response.status === 200) {
        resolve(response)
      } else {
        reject(response)
      }
    })
  })
}

export function updateFile(fileId, content) {
  return new Promise((resolve, reject) => {
    GoogleApi.client
      .request({
        body: body,
        method: 'PATCH',
        params: {uploadType: 'media'},
        path: `/upload/drive/v3/files/${fileId}`
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
  })
}

export function deleteFile(fileId) {
  return new Promise((resolve, reject) => {
    GoogleApi.client
      .request({
        method: 'DELETE',
        path: `/drive/v3/files/${fileId}`
      })
      .then(response => {
        if (response.status === 204) {
          resolve(response)
        } else {
          reject(response)
        }
      })
  })
}

export function getFileList(options = {}) {
  let q = 'trashed=false'
  if (options.mimeType) {
    q += ` and mimeType='${options.mimeType}'`
  }
  return new Promise((resolve, reject) => {
    GoogleApi.client.drive.files
      .list({
        fields: 'files(id, name, modifiedTime)',
        orderBy: 'modifiedTime desc',
        q
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
  })
}
