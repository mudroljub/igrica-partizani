// logove u regularne poruke
// da se ubrzava
// animirati švabu kako se dize i pada
// da se ne sudaraju?

import mish from 'io/mish'
import UI from 'core/UI'
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import Svabo from './Svabo'
import slikaPozadina from 'slike/teksture/suva-trava.jpg'

/*** KONFIG ***/

const DALJI_ROVOVI_Y = 150
const BLIZI_ROVOVI_Y = 300
const bliziRovovi = new Array(10)
const daljiRovovi = new Array(10)
let pogoci = 0
let rekord = 0
let energija = 100

/*** LOGIKA IGRE ***/

const pozadina = new Pozadina(slikaPozadina)

/*** FUNKCIJE ***/

function proveriPogotke(rovovi) {
  for (let i = 0; i < rovovi.length; i++) {
    if (rovovi[i].jePogodjen()) {
      rovovi[i].padni()
      pogoci++
    }
  }
}

function azurirajSvabe(rovovi) {
  for (let i = 0; i < rovovi.length; i++) {
    if (rovovi[i].jeSpreman()) {
      rovovi[i].puca()
      energija--
    }
    rovovi[i].update()
  }
}

function ucitajRekord() {
  rekord = parseInt(localStorage.getItem('svabeRekord'))
  if (!rekord) rekord = 0
}

function sacuvajRekord() {
  if (pogoci > rekord) {
    console.log('Ubio si ' + pogoci + ' okupatora. To je novi rekord!')
    localStorage.setItem('svabeRekord', pogoci)
  }
}

function sablon() {
  return `
    Pogoci: ${pogoci} <br>
    Energija: ${energija} <br>
    Rekord: ${rekord}
  `
}

/*** EXPORT ***/

export default class NemciIzRovova extends Scena {
  constructor() {
    super()
    this.ui = new UI(sablon)
    ucitajRekord()
    this.praviSvabe(bliziRovovi, BLIZI_ROVOVI_Y, {sirina: 100, visina: 150, procenatPojavljivanja: 0.003})
    this.praviSvabe(daljiRovovi, DALJI_ROVOVI_Y, {sirina: 50, visina: 75, procenatPojavljivanja: 0.002})
    mish.dodajNishan()
    this.dodajKlik()
  }

  update() {
    this.cisti()
    pozadina.update()
    azurirajSvabe(bliziRovovi)
    azurirajSvabe(daljiRovovi)
    this.proveriKraj()
  }

  render() {
    this.ui.render()
  }

  dodajKlik() {
    document.onclick = () => {
      const ciljaniRovovi = (mish.y <= DALJI_ROVOVI_Y) ? daljiRovovi : bliziRovovi
      proveriPogotke(ciljaniRovovi)
    }
  }

  praviSvabe(rovovi, y, params) {
    for (let i = 0; i < rovovi.length; i++) {
      rovovi[i] = new Svabo(params.sirina, params.visina, params.procenatPojavljivanja)
      let randomX = Math.random() * this.sirina
      rovovi[i].polozaj(randomX, y)
    }
  }

  proveriKraj() {
    if (energija < 1) {
      sacuvajRekord()
      this.stop()
      console.log('Play again...')
      // document.location.href = ''
    }
  }

  end() {
    super.end()
    mish.ukloniNishan()
  }
}
