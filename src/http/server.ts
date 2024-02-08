import fastify from "fastify";
import cookie from '@fastify/cookie'
import { createPoll } from "../routes/create-poll";
import { getPoll } from "../routes/get-poll";
import { voteOnPoll } from "../routes/vote-on-polls";

const app = fastify();

app.register(cookie, {
  secret: "cdwcwcwcd32112xcdd",
  hook: "onRequest",
})

app.register(createPoll)
app.register(getPoll)
app.register(voteOnPoll)


app.listen({ port: 3333 }).then(() => {
  console.log("HTTP server running");
});
