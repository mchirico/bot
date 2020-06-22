import { Context } from "probot";

class MC {
  context: Context;
  login = "";
  constructor(context: Context) {
    this.context = context;
  }

  get matcher(): RegExp {
    return /^\/([\w]+)\b *(.*)?$/m;
  }

  scmd(name: string, login: string): string[] {
    const { comment, issue, pull_request: pr } = this.context.payload;
    const command = (comment || issue || pr).body.match(this.matcher);
    this.login = this.context?.payload?.comment?.user?.login;
    if (command && name === command[1] && this.login === login) {
      return command;
    }
    return [];
  }
}

export { MC, Context };
