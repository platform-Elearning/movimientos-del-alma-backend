import app from "./server.js";
import { settings } from "./settings/settings.js";
import logger from "./utils/logger.js";

const port = settings.server.serverPort;

app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});