import { FastifyInstance } from "fastify";
import { voting } from "../../utills/voting-pub-sub";
import z from "zod";

export async function pollResults(app: FastifyInstance) {
  app.get(
    "/polls/:pollsId/results",
    { websocket: true },
    (connection, request) => {
      const getPollParams = z.object({
        pollId: z.string().uuid(),
      });

      const { pollId } = getPollParams.parse(request.params);
      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message));
      });
    }
  );
}
