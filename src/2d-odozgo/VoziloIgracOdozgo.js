import Igrac from '/game-engine/core/Igrac.js'
import Granata from './Granata.js'

export default class VoziloIgracOdozgo extends Igrac {

  constructor(src, param = {}) {
    super(src, param)
    this.potisak = 125
    this.faktorTrenja = 0.3
    this.granata = new Granata(this)
    this.komandeNapredne = true
  }

  puca() {
    this.granata.puca()
  }

  proveriGranice() {
    this.odbija()
  }

  update(dt) {
    super.update(dt)
    this.granata.update(dt)
  }
}
