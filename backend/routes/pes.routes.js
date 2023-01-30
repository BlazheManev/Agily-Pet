module.exports = app => {
    const pes = require("../controllers/pes.controller.js");
  
    var router = require("express").Router();
  
    // Ustvari psa
    router.post("/dodaj_psa_dep", pes.create);

    router.get("/vsi", pes.findAll);

    router.get("/:id", pes.findOne);
  
    
  
    app.use("/api", router);
  };