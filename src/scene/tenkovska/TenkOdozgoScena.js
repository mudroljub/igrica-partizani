// scena kao velika mapa lavirint
// kretanje u svim pravcima, kamera prati igraca
// razlicite podloge ubrzavaju/usporavaju tenk
// pobeda/poraz - prepreke ili vreme

import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import {TenkIgracOdozgo} from './TenkIgracOdozgo'
import slikaPozadina from 'slike/2d-odozgo/shumarak-pozadina.png'

export default class TenkOdozgoScena extends Scena {
  constructor(...args) {
    super(...args)
    this.pozadina = new Pozadina(slikaPozadina)
    this.tenk = new TenkIgracOdozgo()
  }

  update() {
    this.pozadina.update()
    this.tenk.update()
  }
}
