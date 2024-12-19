// scena kao velika mapa lavirint
// kretanje u svim pravcima, kamera prati igraca
// razlicite podloge ubrzavaju/usporavaju tenk

import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import {TenkIgracOdozgo} from './TenkIgracOdozgo'
import slikaPozadina from 'slike/2d-odozgo/shumarak-pozadina.png'

/*** INIT ***/

const pozadina = new Pozadina(slikaPozadina)
const tenk = new TenkIgracOdozgo()

/*** EXPORT ***/

export default class TenkOdozgoScena extends Scena {
  update() {
    pozadina.update()
    tenk.update()
  }
}
