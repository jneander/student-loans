  // const boundary = Math.random().toString(36).slice(2);
  // const mimeType = `multipart/mixed; boundary="${boundary}"`;
  // const contentType = 'application/json';

  // function callback (one, two) {
  //   console.log('callback');
  //   console.log(one);
  //   console.log(two);
  // }

  // const body = [
  //   `\r\n--${boundary}\r\n`,
  //   `Content-Type: ${contentType}\r\n\r\n`,
  //   '{"Bullshit":"true"}',
  //   `\r\n--${boundary}--`,
  //   `Content-Type: ${contentType}\r\n\r\n`,
  //   '{"Bullshit":"true"}',
  //   `\r\n--${boundary}--`
  // ].join('');

  // const result = GoogleApi.client.request({
  //   path: '/upload/drive/v3/files/',
  //   method: 'POST', // was PUT
  //   params: {
  //     uploadType: 'multipart'
  //   },
  //   headers: {
  //     'Content-Type': mimeType
  //   },
  //   body,
  //   callback
  // });

  // console.log('result');
  // console.log(result);



  const fileId = '?';

  const content = { foo: 'bar' };
  const json = JSON.stringify(content);

  const body = 'example body here';
  // GoogleApi.client.drive.files.create({
  //   mimeType: 'text/plain'
  // }).then((one) => {
    // console.log(one.result.id);
    // GoogleApi.client.drive.files.update({
    //   content: body,
    //   fileId//: one.result.id
    // }, { content: body }).then((two) => {
    //   console.log(two);
    // });;
  // });


//   this.saveFile = function(file, done) {
//     function addContent(fileId) {
//       return gapi.client.request({
//           path: '/upload/drive/v3/files/' + fileId,
//           method: 'PATCH',
//           params: {
//             uploadType: 'media'
//           },
//           body: file.content
//         })
//     }
//     var metadata = {
//       mimeType: 'application/vnd.google-apps.document',
//       name: file.name,
//       fields: 'id'
//     }
//     if (file.parents) {
//       metadata.parents = file.parents;
//     }

//     if (file.id) { //just update
//       addContent(file.id).then(function(resp) {
//         console.log('File just updated', resp.result);
//         done(resp.result);
//       })
//     } else { //create and update
//       gapi.client.drive.files.create({
//         resource: metadata
//       }).then(function(resp) {
//         addContent(resp.result.id).then(function(resp) {
//           console.log('created and added content', resp.result);
//           done(resp.result);
//         })
//       });
//     }
//   }




  // const boundary = Math.random().toString(36).slice(2);
  // const contentType = 'application/x-multiplicity';
  // const mimeType = `multipart/mixed; boundary="${boundary}"`;
  // const body = [
  //   `\r\n--${boundary}\r\n`,
  //   `Content-Type: ${contentType}\r\n\r\n`,
  //   'Bullshit content',
  //   `\r\n--${boundary}--`
  // ].join('');

  // const result = GoogleApi.client.drive.files.create({
  //   // mimeType: 'application/x-jln.sl.io',
  //   // body: 'root body',
  //   // name: 'root name',
  //   // path: '/upload/drive/v2/files',
  //   // method: 'POST',
  //   uploadType: 'multipart',
  //   media: {
  //     body,
  //     mimeType
  //   }
  //   // uploadType: 'media',
  //   // resource: {
  //   //   // body: 'resource body',
  //   //   name: 'resource name',
  //   //   // mimeType: 'application/x-resource-mime'
  //   // // },
  //   // // media: {
  //   // //   mimeType: 'application/x-media-mime',
  //   // //   body: 'media body',
  //   // }
  // }).then((data) => {
  //   console.log('response');
  //   console.log(data);
  // });

  // console.log(result);
    // .fail((error) => {
    // console.log('error');
    // console.log(error);
  // });
