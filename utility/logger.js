const {createLogger, transports, format} = require('winston');
const moment = require("moment");
const nPath = require('path');

const logger = createLogger({
    format: format.printf((info) => {
        return `[${info.level.toUpperCase()}] (${moment().format('YYYY-MM-DD HH:mm:ss')}): ${JSON.stringify(info.message)}`;
    }),
    transports: [
        new transports.File({
            filename: nPath.join(__dirname, '../logs/', `${moment().format('YYYY-MM-DD')}.log`),
        }),
    ]
});

module.exports = logger;