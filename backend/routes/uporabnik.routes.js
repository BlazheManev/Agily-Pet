module.exports = app => {
    const uporabnik = require("../controllers/uporabnik.controller");
  
    var router = require("express").Router();
  
    // Ustvari uporabnika
    router.post("/register", uporabnik.register);

    router.post("/login", uporabnik.login);

    router.post("/dodaj_psa", uporabnik.dodajPsa);

    router.get("/izpis_psov", uporabnik.izpisiPse);
  
    router.post("/follow", uporabnik.follow);
  
    
  
    app.use("/api", router);
  };