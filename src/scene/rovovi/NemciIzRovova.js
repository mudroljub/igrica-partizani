// uravnotežiti sa delta time
// da se ubrzava
// animirati švabu kako se dize i pada
// da se ne sudaraju?

import mish from 'io/mish'
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import Svabo from './Svabo'
import slikaPozadina from 'slike/teksture/suva-trava.jpg'

const DALJI_ROVOVI_Y = 150
const BLIZI_ROVOVI_Y = 300

export default class NemciIzRovova extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.pogoci = 0
    this.rekord = 0
    this.energija = 100
    this.bliziRovovi = new Array(10)
    this.daljiRovovi = new Array(10)
    this.ucitajRekord()
    this.praviSvabe(this.bliziRovovi, BLIZI_ROVOVI_Y, {sirina: 100, visina: 150, procenatPojavljivanja: 0.003})
    this.praviSvabe(this.daljiRovovi, DALJI_ROVOVI_Y, {sirina: 50, visina: 75, procenatPojavljivanja: 0.002})
    mish.dodajNishan()
    this.dodajKlik()
    this.pozadina = new Pozadina(slikaPozadina)
  }

  sablon() {
    return `
      Pogoci: ${this.pogoci} <br>
      Energija: ${this.energija} <br>
      Rekord: ${this.rekord}
    `
  }
  
  update() {
    this.cisti()
    this.pozadina.update()
    this.azurirajSvabe(this.bliziRovovi)
    this.azurirajSvabe(this.daljiRovovi)
    this.proveriKraj()
  }

  dodajKlik() {
    document.onclick = () => {
      const ciljaniRovovi = (mish.y <= DALJI_ROVOVI_Y) ? this.daljiRovovi : this.bliziRovovi
      this.proveriPogotke(ciljaniRovovi)
    }
  }

  proveriPogotke(rovovi) {
    for (let i = 0; i < rovovi.length; i++) {
      if (rovovi[i].jePogodjen()) {
        rovovi[i].padni()
        this.pogoci++
      }
    }
  }  

  praviSvabe(rovovi, y, params) {
    for (let i = 0; i < rovovi.length; i++) {
      rovovi[i] = new Svabo(params.sirina, params.visina, params.procenatPojavljivanja)
      let randomX = Math.random() * this.sirina
      rovovi[i].polozaj(randomX, y)
    }
  }

  azurirajSvabe(rovovi) {
    for (let i = 0; i < rovovi.length; i++) {
      if (rovovi[i].jeSpreman()) {
        rovovi[i].puca()
        this.energija--
      }
      rovovi[i].update()
    }
  }  

  proveriKraj() {
    if (this.energija > 0) return
    this.stop()
    let poruka = 'Hrabro si pao. '
    if (this.pogoci > this.rekord) {
      poruka += `Ubio si ${this.pogoci} okupatora. To je novi rekord!`
      localStorage.setItem('svabeRekord', this.pogoci)
    }
    this.endScreen(poruka)
  }

  ucitajRekord() {
    this.rekord = parseInt(localStorage.getItem('svabeRekord'))
    if (!this.rekord) this.rekord = 0
  }
  
  end() {
    super.end()
    mish.ukloniNishan()
  }
}
