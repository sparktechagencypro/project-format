import config from "@app/config/index.js";
import app from "app.js";
import { createServer, type Server } from "http";
import colors from "colors";

let server: Server;
const socketServer = createServer(app);

async function main() {
  server = app.listen(Number(config.port), config?.ip as string, () => {
    console.log(
      colors.italic.green.bold(
        `💫 Simple Server Listening on  http://${config?.ip}:${config.port} `,
      ),
    );
  });  
}
main();
process.on("unhandledRejection", (err) => {
  console.log(`😈 unahandledRejection is detected , shutting down ...`, err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on("uncaughtException", () => {
  console.log(`😈 uncaughtException is detected , shutting down ...`);
  process.exit(1);
});
