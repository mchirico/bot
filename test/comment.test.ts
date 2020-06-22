import nock from "nock";
import myProbotApp from "../src";
import { Probot } from "probot";
import payload from "./fixtures/issues.comment.json";
import * as fs from "fs";
import * as path from "path";
import ErrnoException = NodeJS.ErrnoException;

const expectedLabel = ["PigPork"];

describe("My Probot app", () => {
  let probot: any;
  let mockCert: string;

  beforeAll((done: Function) => {
    fs.readFile(
      path.join(__dirname, "fixtures/mock-cert.pem"),
      (err: ErrnoException | null | Error, cert: Buffer) => {
        if (err) return done(err);
        mockCert = cert.toString();
        done();
      }
    );
  });

  beforeEach(() => {
    nock.disableNetConnect();
    probot = new Probot({ id: 123, cert: mockCert });
    // Load our app into probot
    probot.load(myProbotApp);
  });

  test("creates a label", async (done) => {
    nock("https://api.github.com")
      .post("/app/installations/9865425/access_tokens")
      .reply(200, { token: "test" });

    // POST /repos/:owner/:repo/issues/:issue_number/labels

    // Test that a comment is posted
    nock("https://api.github.com")
      .post("/repos/mchirico/bot/issues/43/labels", (body: any) => {
        done(expect(body).toMatchObject(expectedLabel));
        return true;
      })
      .reply(200);

    // Receive a webhook event
    await probot.receive({ name: "issue_comment", payload });
  });

  afterEach(() => {
    nock.cleanAll();
    nock.enableNetConnect();
  });
});
