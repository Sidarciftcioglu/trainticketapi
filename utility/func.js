const requestIp = require("request-ip");

exports.printMessage = (Status, Message, Data) => {
    return {status: Status, message: Message, data: Data !== null ? this.dataToJson(Data) : Data};
}

exports.SetHeaderIpAddress = (req, res, next) => {
    res.setHeader('Client-IpAddress', `${requestIp.getClientIp(req)}`);
    next();
}

exports.dataToJson = (str) => {
    try {
        try {
            str.forEach(function (val) {
                Object.keys(val).forEach(function (key) {
                    if (this.IsJsonString(val[key])) {
                        val[key] = JSON.parse(val[key]);
                    }
                });
            });
        } catch (e) {
            Object.keys(str).forEach(function (key) {
                if (this.IsJsonString(str[key])) {
                    str[key] = JSON.parse(str[key]);
                }
            });
        }

        return JSON.parse(JSON.stringify(str, null, 0));
    } catch (ex) {
        return str;
    }
}

exports.IsJsonString = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
