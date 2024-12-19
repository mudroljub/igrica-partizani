// potvrdi igraj ponovo kad pogine
// ubaciti zvuk i eksploziju
// ubaciti uništen tenk
// napraviti beskonačnu pozadinu sa preprekama i objektima koji nalecu
// napraviti verziju za minobacače

import platno from 'io/platno'
import UI from 'core/UI'
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import TenkPartizanski from './TenkPartizanski'
import TenkNemacki from './TenkNemacki'
import slikaPozadina from 'slike/pozadine/razrusen-grad-savremen.jpg'

/*** INIT ***/

const tenk1 = new TenkPartizanski(100, 450)
const tenk2 = new TenkNemacki(650, 450)
const pozadina = new Pozadina(slikaPozadina)
const interfejs = new UI(sablon)

export default class TenkiciScena extends Scena {
  constructor() {
    super()
    this.velicina(800, 500)
    this.dodaj()
  }

  update() {
    pozadina.update()
    tenk2.proveriTipke()
    tenk1.update()
    tenk2.update()
    proveriPogodak(tenk1.granata, tenk2, 2)
    proveriPogodak(tenk2.granata, tenk1, -2)
  }

  render() {
    interfejs.render()
  }
}

/*** POMOĆNE FUNKCIJE ***/

function proveriPogodak(granata, tenk, pomak) {
  if (granata.sudara(tenk)) {
    tenk.energija -= Math.round(Math.random() * 100)
    granata.nestani()
    tenk.x += pomak
    if (tenk.energija <= 0) {
      tenk.energija = 0
      reset()
    }
  }
}

function reset() {
  let x1 = (Math.random() * platno.width / 2)
  let x2 = (Math.random() * platno.width / 2) + platno.width / 2
  tenk1.polozaj(x1, 450)
  tenk2.polozaj(x2, 450)
  tenk1.energija = tenk2.energija = 100
}

function sablon() {
  return `
    <div class='komande bg-poluprovidno komande1'>
      <span class='bold'>Tenk 1</span>
      <br> A - levo
      <br> D - desno
      <br> W - gore
      <br> S - dole
      <br> space - puca
    </div>

    <div class='komande bg-poluprovidno komande2'>
      <span class='bold'>Tenk 2</span>
      <br> ← levo
      <br> → desno
      <br> ↑ gore
      <br> ↓ dole
      <br> M - puca
    </div>
    <div class='komande bg-poluprovidno energija1'>${tenk1.energija}</div>
    <div class='komande bg-poluprovidno energija2'>${tenk2.energija}</div>
    <progress class='komande poluprovidno progres1' value='${tenk1.energija}' max='100'></progress>
    <progress class='komande poluprovidno progres2' value='${tenk2.energija}' max='100'></progress>
  `
}
