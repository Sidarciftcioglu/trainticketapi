const path = require("path");
const func = require("../utility/func");

exports.get404Page = (req,res) => {
    res.status(404).send(func.printMessage(false, "Yanlış istekte bulundunuz!!", null));
}
