const configureApp = require('@jneander/dev-tools/configuration/configureApp')
const {getEnv} = require('@jneander/dev-tools/utils/cli')

module.exports = configureApp({
  env: getEnv(),
  pages: [
    {
      name: 'client',
      outputPath: '',
      sourcePath: 'client',
      template: 'client/shared/markup/index.html'
    }
  ]
})
