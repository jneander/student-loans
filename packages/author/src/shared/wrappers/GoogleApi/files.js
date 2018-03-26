import GoogleApi from 'google-api'

export function createFile(attr) {
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

export function getFile(fileId) {
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

function updateFileContent(fileId, attr) {
  //useContentAsIndexableText
  return new Promise((resolve, reject) => {
    GoogleApi.client
      .request({
        body: JSON.stringify(content),
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

export function updateFile(fileId, attr) {
  return updateFileMetadata(fileId, attr)
}

export function deleteFile(fileId) {
  return updateFileMetadata(fileId, {trashed: true})
  // return new Promise((resolve, reject) => {
  //   GoogleApi.client
  //     .request({
  //       method: 'DELETE',
  //       path: `/drive/v3/files/${fileId}`
  //     })
  //     .then(response => {
  //       if (response.status === 204) {
  //         resolve(response)
  //       } else {
  //         reject(response)
  //       }
  //     })
  // })
}

export function getFileList(options = {}) {
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
