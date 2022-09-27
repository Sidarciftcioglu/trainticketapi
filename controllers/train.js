const logger = require("../utility/logger");
const func = require("../utility/func");
const _ = require("underscore");
const env = require("../utility/env");
const {printMessage} = require("../utility/func");

exports.checkRezervation = (req, res, next) => {
    try {
        let train = req.body.Tren;
        let isDifferentVagon = req.body.KisilerFarkliVagonlaraYerlestirilebilir;
        let rezPerson = req.body.RezervasyonYapilacakKisiSayisi;
        let reqRezervation = rezPerson;

        let result = {
            RezervasyonYapilabilir: false,
            YerlesimAyrinti: []
        };

        _.each(train.Vagonlar, function (val, key) {
            let isFull = Math.ceil((val.Kapasite * 0.7)) - val.DoluKoltukAdet;
            if (isFull > 0 && rezPerson > 0) {
                if (isDifferentVagon) {
                    result.RezervasyonYapilabilir = true;
                    let res = rezPerson - isFull < 0;
                    result.YerlesimAyrinti.push({
                        VagonAdi: train.Vagonlar[key].Ad,
                        KisiSayisi: res === true ? rezPerson : isFull
                    });
                    rezPerson = rezPerson - isFull;
                } else {
                    if (isFull - rezPerson >= 0) {
                        result.RezervasyonYapilabilir = true;
                        result.YerlesimAyrinti.push({VagonAdi: train.Vagonlar[key].Ad, KisiSayisi: rezPerson});
                    }
                }
            }
        })

        let rez = 0;
        _.each(result.YerlesimAyrinti, function (val) {
            rez += val.KisiSayisi;
        })

        if (rez !== reqRezervation) {
            result.RezervasyonYapilabilir = false;
            result.YerlesimAyrinti = [];
        }

        res.send(result);
    } catch (ex) {
        logger.error(ex);
        res.send(printMessage(false, "Bir hata oluştu!", null));
        return res.end();
    }
}