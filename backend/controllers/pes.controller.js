const db = require("../models/baza");
const Pes = db.pes;                    //


exports.create = (req, res) => {
  console.log("nekaj dela");
  console.log(req.body);
  if (!req.body.ime) {
    res.status(400).send({ message: "Must not be empty" });
    return;
  }

  // Create Pes
  const pes = new Pes({
    ime: req.body.ime,
    pasma: req.body.pasma,
    visina: req.body.visina,
    starost: req.body.starost,
    manjkaEna: req.body.manjkaEna,
		manjkataDve: req.body.manjkataDve,
		sklepi: req.body.sklepi
  });

  // Shrani v bazo
  pes
    .save(pes)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Error"
      });
    });
};


exports.findAll = (req, res) => {
  const ime = req.query.ime;
  var condition = ime ? { ime: { $regex: new RegExp(ime), $options: "i" } } : {};

  Pes.find(condition)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving data."
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Pes.findById(id)
    .then(data => {
      if (!data)
        res.status(404).send({ message: "Could not find: " + id });
      else res.send(data);
    })
    .catch(err => {
      res
        .status(500)
        .send({ message: "Error retrieving id=" + id });
    });
};