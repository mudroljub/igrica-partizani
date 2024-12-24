// h1: Bekstvo iz Jasenovca

import Scena from 'core/Scena'
import Predmet from 'core/Predmet'
import Pozadina from 'core/Pozadina'
import TenkOdozgo from './TenkOdozgo'
import slikaBeton from 'slike/teksture/beton.gif'
import slikaZica from 'slike/2d-bocno/stvari/bodljikava-zica.gif'

/*** INIT ***/

const pozadina = new Pozadina(slikaBeton)
const tenk = new TenkOdozgo(100, 200)
const zica = new Predmet(slikaZica)

/*** EXPORT ***/

export default class JasenovacScena extends Scena {
  constructor(...args) {
    super(...args)
    zica.polozaj(400, 100)
  }

  update() {
    this.cisti()
    pozadina.update()
    zica.update()
    tenk.patroliraj()
    tenk.update()
  }
}
