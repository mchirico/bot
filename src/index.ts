import { Application } from 'probot' // eslint-disable-line no-unused-vars
import { MC } from './mycommands'
// import { Dlog } from './logger'

export = (app: Application) => {
  app.on('issues.opened', async (context) => {
    const issueComment = context.issue({ body: `${context.payload.issue.user.login},\nThanks for opening this issue!` })
    await context.github.issues.createComment(issueComment)
  })

  app.on(['issue_comment.created', 'issues.opened', 'pull_request.opened'], async (context) => {
    const mc = new MC(context)

    const labels = Array.of(mc.scmd('label', 'mchirico')[2])
    // const log = new Dlog()
    // log.log(`${mc.scmd('label', 'mchirico')[2]}\n
    //
    //     labels: ${labels}
    //     `)

    await context.github.issues.addLabels(context.issue({ labels }))
  })
}
