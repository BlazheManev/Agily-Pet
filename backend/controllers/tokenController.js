const db = require("../models/baza");
const Uporabnik = db.registriran_uporabniks;
const Event = db.event;
var EventModel = db.event;
const Course = db.courses;
const { google } = require('googleapis');

exports.getData = async (req, res) => {

    const zeton = req.body.token;


    await Uporabnik.updateOne({ token: zeton }, {
        $push: { prijavljeni: req.body.id }
    })
    const novUporabnik = await Uporabnik.findOne({ token: zeton })
    await Event.updateOne({ _id: req.body.id }, {
        $push: { prijavljeni_Users: novUporabnik._id }
    })
    EventModel.find(function (err, events) {
        if (err) {
            return res.status(500).json({
                message: 'Error when getting event.',
                error: err
            });
        }
        return res.json(novUporabnik);
    });
}


exports.odjavaDogodek = async (req, res) => {

    const zeton = req.body.token;

    await Uporabnik.updateOne({ token: zeton }, {
        $pull: { prijavljeni: req.body.id }
    });
    const novUporabnik = await Uporabnik.findOne({ token: zeton });

    await Event.updateOne({ _id: req.body.id }, {
        $pull: { prijavljeni_Users: novUporabnik._id }
    });
    return res.json(novUporabnik);

}



exports.prijavlenUser = async (req, res) => {
    const novUporabnik = await Uporabnik.findOne({ token: req.body.token })
    return res.json(novUporabnik);

}

exports.mojCourse = async (req, res) => {
    let mojiCoursi = [];
    const novUporabnik = await Uporabnik.findOne({ token: req.body.token })

    for (let i = 0; i <= novUporabnik.course.length - 1; i++) {
        let course = await Course.findOne({ _id: novUporabnik.course[i] })
        if (course === null) {
        }
        else {
            mojiCoursi.push(course)
        }

    }
    console.log("konec")

    return res.json(mojiCoursi);



}


exports.myDogs = async (req, res) => {
    const novUporabnik = await Uporabnik.findOne({ token: req.params.id })
    if (novUporabnik === null || novUporabnik.pes.length === 0) {
    } else {
        return res.json(novUporabnik.pes);
    }

}
exports.deleteDog = async (req, res) => {

    await Uporabnik.updateOne({ token: req.body.token }, {
        "$pull": { "pes": { "_id": req.body.id } }
    })
    const uporabnik = await Uporabnik.findOne({ token: req.body.token })
    return res.json(uporabnik.pes);



}
exports.getDogodki = async (req, res) => {
    const uporbanikZaEvent = await Uporabnik.findOne({ token: req.params.id })
    let mojiEvents = [];
    console.log(uporbanikZaEvent.event.length)
    if (uporbanikZaEvent.event.length === 0) {
        return res.json(mojiEvents);

    } else {
        for (let i = 0; i <= uporbanikZaEvent.event.length - 1; i++) {
            let event = await Event.findOne({ _id: uporbanikZaEvent.event[i] })
            if (event === null) {
            }
            else {
                mojiEvents.push(event)
            }
        }
        return res.json(mojiEvents);
    }
}

exports.deleteEvent = async (req, res) => {

    await Uporabnik.updateOne({ token: req.body.token }, {
        "$pull": { "event": req.body.id }
    });
    const { OAuth2 } = google.auth

        const oAuth2Client = new OAuth2(
            '395321912984-5o8pnf4ghq97047ll613ftgu0lv17a82.apps.googleusercontent.com',
            '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'
        )

        oAuth2Client.setCredentials({
            refresh_token: '1//04qkFgI7KO6FwCgYIARAAGAQSNwF-L9IrMBrqCQXlLF_i4wP3cRcR6s_IXZkuPw8A4b80tYoI_uKWE0zXHC_iQXEP72BGd9O-Tpg'
        })


        const calendar = google.calendar({ version: 'v3', auth: oAuth2Client })

    function deleteEvent(eventId) {

        var params = {
            calendarId: 'primary',
            eventId: eventId,
        };

        calendar.events.delete(params, function (err) {
            if (err) {
                console.log('The API returned an error: ' + err);
                return;
            }
            console.log('Event deleted.');
        });
    }
    
    const eventBrisanje = await EventModel.findOne({ _id: req.body.id })
    EventModel.findByIdAndRemove(req.body.id, function (err, event) {
    });


    const uporbanikZaEvent = await Uporabnik.findOne({ token: req.body.token })
    let mojiEvents = [];
    if(eventBrisanje===null){

    }
    let idZaEvent=  eventBrisanje.ime;
     idZaEvent=  idZaEvent.split('').sort().join('').toLowerCase();
     idZaEvent=  idZaEvent.trim();

    for(let i =0;i<idZaEvent.length;i++){
       idZaEvent=idZaEvent.replace('w','v');
       idZaEvent=idZaEvent.replace('x','v');
       idZaEvent=idZaEvent.replace('y','v');
       idZaEvent=idZaEvent.replace('z','v');

    }
    console.log(idZaEvent)
    deleteEvent(idZaEvent)
    if (uporbanikZaEvent.event.length === null) {
        return res.json(mojiEvents);

    } else {
        for (let i = 0; i <= uporbanikZaEvent.event.length - 1; i++) {
            let event = await Event.findOne({ _id: uporbanikZaEvent.event[i] })
            if (event === null) {
            }
            else {
                mojiEvents.push(event)
            }
        }
        return res.json(mojiEvents);
    }


}