const web = require('./applications/web');
require('dotenv').config({quiet:true});
const port = process.env.PORT || 3000;
const logger = require("./applications/logging")

web.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});