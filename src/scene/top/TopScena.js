import platno, { crtaNeboZemlju } from '/game-engine/io/platno.js'
import Scena from '/game-engine/core/Scena.js'
import Top from './Top.js'
import Strelac from './Strelac.js'
import Zastavnik from './Zastavnik.js'
import Posada from './Posada.js'
import TenkDesno from '../tenkici/TenkDesno.js'
import { progresBar } from '/game-ui/components.js'

const tlo = platno.height * .75

const callback = cilj => {
  const steta = Math.ceil(Math.random() * 2)
  cilj.energija = Math.max(cilj.energija - steta, 0)
}

export default class TopScena extends Scena {
  init() {
    const zastavnik = new Zastavnik(40, tlo + 1)
    this.top = new Top(230, tlo - 32)
    const posada = new Posada(110, tlo + 8)
    const strelac = new Strelac(300, tlo + 8)
    this.tenk = new TenkDesno({ skalar: .6, y: tlo, cilj: this.top, callback })
    this.dodaj(this.tenk, this.top, strelac, posada, zastavnik)
  }

  cisti() {
    crtaNeboZemlju(tlo, { linija: true })
  }

  update(dt, t) {
    super.update(dt, t)
  }

  sablon() {
    return /* html */`
      <div class="komande">
        ${progresBar(this.top.energija)}
      </div>
    `
  }
}
