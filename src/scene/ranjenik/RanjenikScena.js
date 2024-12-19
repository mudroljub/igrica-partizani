// prikazati poruke umesto log (napraviti neko pomagalo)
// iskoristiti za Bekstvo iz Jasenovca i ranjenik paljba
// povecavati broj patrola
// u jasenovcu beton i trebalo bi ustase, a na sutjesci nemci, italijani, cetnici

import {izasaoDesno} from 'akcije/granice'
import {platno, podloga} from 'io/platno'
import {skaliranRazmak} from 'utils'
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import Ranjenik from './Ranjenik'
import Patrola from './Patrola'
import Vreme from 'core/Vreme'
import UI from 'core/UI'
import slikaPozadinaSumarak from 'slike/2d-odozgo/shumarak-pozadina.png'
import slikaPozadinaBeton from 'slike/teksture/beton.gif'
import slikaPatrolaNemci from 'slike/2d-odozgo/nemci-patrola.gif'
import slikaPatrolaTalijani from 'slike/2d-odozgo/talijani-patrola.gif'

/*** KONFIG ***/

let scena = 0
let strelicaVidljiva = false
const pauzaCrtanja = 3000
const trajanjeStrelice = 500

/*** FUNKCIJE ***/

const crtajStrelicu = () => {
  podloga.lineWidth = 5
  podloga.strokeStyle = 'red'
  podloga.beginPath()
  podloga.moveTo(platno.width * 0.6, platno.height * 0.5)
  podloga.lineTo(platno.width * 0.9, platno.height * 0.5)
  podloga.moveTo(platno.width * 0.8, platno.height * 0.4)
  podloga.lineTo(platno.width * 0.9, platno.height * 0.5)
  podloga.lineTo(platno.width * 0.8, platno.height * 0.6)
  podloga.stroke()
}

const sablon = () => {
  return `
    <div class='komande bg-poluprovidno komande1'>
     <b>Komande</b>
     <br> A - levo
     <br> D - desno
     <br> W - napred
     <br> S - nazad
   </div>
  `
}

/*** INIT ***/

const pozadina = new Pozadina(slikaPozadinaSumarak)
const ranjenik = new Ranjenik()
const patrola = new Patrola(slikaPatrolaNemci)

export default class RanjenikScena extends Scena {
  constructor() {
    super()
    this.ui = new UI(sablon)
    this.vreme = new Vreme()
    patrola.polozaj(this.sirina * 3/4, this.visina * 3/4)
    ranjenik.polozaj(this.sirina / 4, this.visina / 2)
    this.dodaj(pozadina, ranjenik, patrola, this.ui)
  }

  update() {
    super.update()
    patrola.zvuk.volume = skaliranRazmak(patrola, ranjenik)
    this.proveriSudare()
    this.proveriPobedu()
    this.smenjujStrelicu()
  }

  render() {
    super.render()
    if (strelicaVidljiva) crtajStrelicu()
  }

  smenjujStrelicu() {
    if (!strelicaVidljiva && this.vreme.proteklo < pauzaCrtanja) return
    if (strelicaVidljiva && this.vreme.proteklo < trajanjeStrelice) return
    strelicaVidljiva = !strelicaVidljiva
    this.vreme.reset()
  }

  proveriSudare() {
    if (patrola.sudara(ranjenik)) {
      patrola.stop()
      patrola.vikniZaredom(2)
      console.log('Uhvaćen si...')
      this.stop()
    }
  }

  proveriPobedu() {
    if (izasaoDesno(ranjenik)) this.promeniScenu()
    if (scena < 4) return
    console.log('pobeda!')
    this.stop()
  }

  promeniScenu() {
    const parna = scena % 2 === 0
    const slikaPozadine = parna ? slikaPozadinaBeton : slikaPozadinaSumarak
    const slikaPatrole = parna ? slikaPatrolaTalijani : slikaPatrolaNemci
    pozadina.zameniSliku(slikaPozadine)
    patrola.zameniSliku(slikaPatrole)
    patrola.postaviRandom()
    ranjenik.x = 10
    scena++
  }

  end() {
    super.end()
    patrola.zvuk.pause()
  }
}
