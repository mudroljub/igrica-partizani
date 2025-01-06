import Igrac from '/game-engine/core/Igrac.js'

export default class Ranjenik extends Igrac {
  constructor(x, y) {
    super('/assets/slike/2d-odozgo/ranjeni-partizan.png', { x, y })
    this.komandeNapredne = true
    this.potisak = 2
    this.okret = 0.01
  }

  proveriGranice() {
    this.ograniciVodoravno()
  }
}
