import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('issues.opened', async (context) => {
    app.log('Yay, my app is loaded')
    const issueComment = context.issue({ body: `${context.payload.issue.user.login},\nThanks for opening this issue!` })
    await context.github.issues.createComment(issueComment)
    app.log('Yay, my app is finished')
  })
  // For more information on building apps:
  // https://probot.github.io/docs/

  // To get your app running against GitHub, see:
  // https://probot.github.io/docs/development/
}
