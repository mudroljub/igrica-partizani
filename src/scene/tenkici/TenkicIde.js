// zbunje
// predmeti ne kruze
// tenkovi, bunkeri, vojnici...

import UI from 'core/UI'
import Scena from 'core/Scena'
import TenkPartizanski from './TenkPartizanski'
import Zbun from 'src/2d-bocno/Zbun'
import Shuma from 'src/2d-bocno/Shuma'
import Planina from 'src/2d-bocno/Planina'
import Oblak from 'src/2d-bocno/Oblak'
import platno from 'io/platno'

/*** KONFIG ***/

const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const PARALAX_1 = -5
const zbunovi = []
const oblaci = []
const nivoTla = platno.height - 100

const tenk = new TenkPartizanski(100, nivoTla)
const planina = new Planina(nivoTla)
const shumarak = new Shuma(nivoTla)
const ui = new UI(sablon)

shumarak.dx = PARALAX_1
planina.dx = PARALAX_1

for (let i = 0; i < BROJ_ZBUNOVA; i++) {
  zbunovi[i] = new Zbun(nivoTla)
  zbunovi[i].dx = PARALAX_1
}

for (let i = 0; i < BROJ_OBLAKA; i++) {
  oblaci[i] = new Oblak(150, 100)
  oblaci[i].dx = PARALAX_1
}


export default class TenkicIde extends Scena {
  constructor() {
    super()
    this.nivoTla = nivoTla
  }

  update() {
    this.crtaNeboZemlju(nivoTla)
    planina.update()
    shumarak.update()
    shumarak.proveriGranice(platno.width / 2)
    planina.proveriGranice(platno.width + 200)
    azurirajOblake()
    tenk.update()
    azurirajZbunje()
  }

  render() {
    ui.render()
  }
}

/*** POMOĆNE FUNKCIJE ***/

function sablon() {
  return `
    <div class="komande bg-poluprovidno komande1">
     <b>Komande</b>
     <br> A - levo
     <br> D - desno
     <br> W - gore
     <br> S - dole
     <br> space - puca
     <div class="komande bg-poluprovidno energija1">${tenk.energija}</div>
     <progress class="komande poluprovidno progres1" value="${tenk.energija}" max="100"></progress>
   </div>
  `
}

function azurirajZbunje() {
  for (let i = 0; i < zbunovi.length; i++) {
    zbunovi[i].update()
    zbunovi[i].proveriGranice(10)
  }
}

function azurirajOblake() {
  for (let i = 0; i < oblaci.length; i++) {
    oblaci[i].update()
    oblaci[i].proveriGranice()
  }
}
