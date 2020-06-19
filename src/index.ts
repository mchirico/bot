import { Application } from 'probot' // eslint-disable-line no-unused-vars

export = (app: Application) => {
  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({ body: `${context.payload.issue.user.login},\nThanks for opening this issue!` })
    await context.github.issues.createComment(issueComment)
  })
}
