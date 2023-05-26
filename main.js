const dotenv = require('dotenv');

const {APP_PORT} = require("./config");
const {app} = require('./server/server')

dotenv.config();

const main = async () => {
    const server = await app();
    server.listen(APP_PORT);
    console.log(`Connected to port:${APP_PORT}`);
};
main();