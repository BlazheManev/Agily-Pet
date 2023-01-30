# AgilyPet 

## Namen projekta
Naš cilj je narediti rešitev, ki bo zadovoljevala vsem pogojem/vmesnim ciljem/funkcionalnostim, ki si jih zastavimo.
Cilj je narediti čim boljšo spletno aplikacijo, ki bo tehnološko zahtevna in lepo oblikovana. Cilj je tudi pravilno uporabljati
vse tehnologije ki smo se jih dogovorili uporabiti. V povzetku je naš cilj zadovoljiva in uporabna spletna aplikacija.

## Funkcionalnosti
- **Urejanje coursov**
- **Risanje coursov**
- **Sledenje kreatorju coursa**
- **Pošiljanje maila ob izdaji novega coursa**
- **Podatki o pasmi psa uporabnika**
- **Podatki o izbrani pasmi psa**
- **Urejanje dogodkov**
- **Prikaz dogodka na koledarju**
- **Prijava in odjava na dogodek**
- **Vnos psa**
- **Filtriranje po coursih glede na zdravstveno stanje psa**
- **Avtentikacija**

## Tehnološki sklad
React.js,JWT,Node.js,Typescript,google api,calendari api,dog api,Mongo,express,bootsrap

## Razvojno okolje
- VisualStudio Code


## Vzpostavitev projekta
Ker se projekt nahaja na GitLab-u, lahko vzpostavimo projekt tako da kloniramo [GitLab repozitorij](https://gitlab.com/LukacJan/agilypet).


## Namestitev projekta
Projekt se lahko namesti s pomočjo ```docker-compose.yml``` datoteke, ki se nahaja v root direktoriju projekta. 
Ukaz za namestitev je: ```docker-compose up```.

## Vloge
username: osnovni@uporabnik.si
password: osnovni123


<!--
## Opis projekta

### Opis
AgilyPet je naziv našega projekta, ki smo si ge izbrali pri predmetu Praktikum 2. 

### Naloga
Naša naloga je nareiti rešitev glede na podano navodilo in jo na koncu predstaviti.

### Navodilo
```
Vse več ljudi ima hišne ljubljenčke, s katerimi si želijo aktivno preživeti čas. Ena izmed možnosti za
aktivno preživljanje prostega časa s svojim ljubljenčkom je postavitev domačega agility-ja. Večina
ljudi si pod pojmom agilty predstavlja progo za večje pse, kjer psi tečejo in preskakujejo ovire.
Vendar pa so posebne oblike proge za agilty primerne tudi za manjše pse, za pse z zdravstvenimi
težavami in tudi druge vrste hišnih ljubljenčkov, kot so hrčki in vietnamski prašički. 

Na skupnem seznamu označite, katere proge so dodane s strani administratorja in katere s strani
registriranih uporabnikov. Omogočite, da se lahko uporabniki prijavijo na določenega avtorja prog in
mu sledijo ter so obveščeni (preko elektronske pošte), ko je s strani avtorja dodana nova proga.
```

## Ciji
Naš cilj je narediti rešitev, ki bo zadovoljevala vsem pogojem/vmesnim ciljem/funkcionalnostim, ki si jih zastavimo.
Cilj je narediti čim boljšo spletno aplikacijo, ki bo tehnološko zahtevna in lepo oblikovana. Cilj je tudi pravilno uporabljati
vse tehnologije ki smo se dogovorili uporabiti. V kartekem je naš cilj zadovoljiva in uporabna spletna aplikacija.

## Specifikacije
### Tehnologije
- Node.js
- Express
- React
- MongoDB
- Git (GitLab)

### Razvojno okolje
- Visual studio code

### Sledenje poteku dela
- GitLab

## Način dela
Delo si bomo med posamezniki razdelili po dogovoru v skupini. Delo posameznika bomo sledili in posledično lahko spremljali v GitLab-u s pomočjo List-ov in Milestone-ov. Liste bomo lahko spremljali s pomočjo premikanja po tabli (Board) glede na to pod
katero labelo (To do, Doing, Done) se nahaja določen list.

## Vzpostavitev
Navodila kako vzpostaviti začetno aplikacijo.

Najprej bo potrebno izvesti pull, da pridobimo vse datoteke na veji main

### Vzpostavitev React (frontend)
Za vzpostavitev bomo se morali pomakniti v podmapo our-app ki se nahaja v mapi frontend.
To naredimo z ukazom ```cd .\frontend\```, da se premaknemo v mapo frontend, nato pa še uporabimo ukaz ```cd .\our-app\``` da se
premaknemo v podmapo our-app. Zdaj bi naš terminal moral zgledati nekako tako: ![Terminal react](/slike/terminal_react.PNG)
Sedaj moramo ustvariti še node_modules, kar pa naredimo z ukazom ```npm install```. Sedaj imamo React vzpostavljen.

### Vzpostavitev backend-a
Za vzpostavitev bomo se morali pomakniti v mapo backend.
![Mape backend](/slike/backend_mapa.PNG)
To naredimo z ukazom ```cd .\backend\```, da se premaknemo v mapo backend (Seveda se moramo pred izvedbo tega ukaza nahajati v korenski mapi).  Zdaj bi naš terminal moral zgledati nekako tako: ![Terminal backend](/slike/terminal_backend.PNG)
Sedaj moramo ustvariti še node_modules, kar pa naredimo z ukazom ```npm install```. Sedaj imamo backend vzpostavljen.

## Zagon aplikacije
Po vzpostavitvi aplikacije lahko aplikacijo zaženemo.

### Zagon backend-a
Backend zaženemo, tako da ko se nahajamo v podmapi backend v terminal napišemo ukaz ```node index.js```. Sedaj imamo zagnan backend na port-u 3001.

### Zagon React-a (frontend)
React zaženemo, tako da ko se nahajamo v podmapi our-app, ki je v mapi frontend in v terminal napišemo ukaz ```npm start```. Sedaj imamo zagnan React na port-u 3000.

## Nameščanje rešitve 
Našo aplikacijo se lahko namesti s pomočjo docker-compose ali pa s pomočjo dockerfile

### Nameščanje rešitve s pomočjo Dockerfile
Najprej je potrebno klonirati [repozitorij našega projekta](https://gitlab.com/LukacJan/agilypet). Ko smo projekt klonirali in ga imamo nameščenega na svoji napravi, se premaknemo v ta projekt.

#### Nameščanje rešitve s pomočjo Dockerfile (backend)
Najprej se premaknemo v mapo ![backend](/slike/backend_mapa.PNG), z ukazom ```cd .\backend\```. Nato pa zaženemo ukaz 
```docker build . -t {username}/agilypet-backend:0.1```. S tem ukazom smo ustvarili docker image za backend. Nato lahko docker image zaženemo, kar lahko storimo kar najlažje preko [Docker Desktop](https://www.docker.com/products/docker-desktop/), ali pa z ukazom ```docker run -d -p 3001:3001 {username}/agilypet-backend:0.1```. Tako smo namestili in zagnali backend.

#### Nameščanje rešitve s pomočjo Dockerfile (frontend)
Najprej se premaknemo v mapo ![ts_frontend/our-app](/slike/react_mape.PNG), z ukazom ```cd .\ts_frontend\our-app```. Nato pa zaženemo ukaz 
```docker build . -t {username}/agilypet-frontend:0.1```. S tem ukazom smo ustvarili docker image za frontend. Nato lahko docker image zaženemo, kar lahko storimo kar najlažje preko [Docker Desktop](https://www.docker.com/products/docker-desktop/), ali pa z ukazom ```docker run -d -p 3000:3000 {username}/agilypet-frontend:0.1```. Tako smo namestili in zagnali frontend.

### Nameščanje rešitve s pomočjo docker-compose
Dokaj preprosto lahko namestimo aplikacijo s pomočjo docker-compose. Ker so image-i že zgrajeni in dodani v javni repozitorij, lahko preprosto celotno aplikacijo namestimo s pomočjo ukaza ```docker-compose up```, seveda se moramo v tistem trenutku nahajati v mapi, kjer je datoteka docker-compose.yml.
