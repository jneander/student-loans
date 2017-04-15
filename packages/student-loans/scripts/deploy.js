require('@jneander/dev-tools/utils/env')

const s3 = require('@jneander/dev-tools/deployment/s3')

s3
  .deploy({
    accessKeyId: process.env.STUDENT_LOANS_ACCESS_KEY_ID,
    bucket: process.env.STUDENT_LOANS_BUCKET_NAME,
    packageDir: 'student-loans/__build__',
    secretAccessKey: process.env.STUDENT_LOANS_SECRET_ACCESS_KEY
  })
  .then(() => {
    process.exit(0)
  })
  .catch(() => {
    process.exit(1)
  })
