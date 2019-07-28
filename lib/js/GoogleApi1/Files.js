import GoogleApi from 'google-api'

function updateFileMetadata(fileId, attr) {
  return new Promise((resolve, reject) => {
    GoogleApi.client
      .request({
        body: JSON.stringify(attr),
        method: 'PATCH',
        ...attr,
        path: `/drive/v3/files/${fileId}`
      })
      .then(response => {
        console.log(response)
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
  })
}

export default class Files {
  async createFile(attr) {
    return new Promise((resolve, reject) => {
      GoogleApi.client.drive.files.create({
        parents: ['appDataFolder'],
        ...attr
      }).then(response => {
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
    })
  }

  async getFile(fileId) {
    return new Promise((resolve, reject) => {
      GoogleApi.client.drive.files.get(fileId).then(response => {
        console.log(response)
        if (response.status === 200) {
          resolve(response)
        } else {
          reject(response)
        }
      })
    })
  }

  async getFileList(options = {}) {
    let query = 'trashed=false'
    if (options.mimeType) {
      query += ` and mimeType='${options.mimeType}'`
    }
    return new Promise((resolve, reject) => {
      GoogleApi.client.drive.files
        .list({
          fields: 'files(id, name, modifiedTime)',
          orderBy: 'modifiedTime desc',
          q: query,
          spaces: 'appDataFolder'
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

  async updateFile(fileId, attr) {
    return updateFileMetadata(fileId, attr)
  }

  async deleteFile(fileId) {
    return updateFileMetadata(fileId, {trashed: true})
  }
}
