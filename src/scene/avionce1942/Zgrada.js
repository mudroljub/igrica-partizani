import Predmet from '/game-engine/core/Predmet.js'
import { vracaVodoravno } from '/game-engine/akcije/granice.js'

export default class Zgrada extends Predmet {
  constructor(nivoTla, src = '/assets/slike/2d-bocno/zgrade/ruina.png') {
    super(src)
    this.procenatVracanja = 1
    this.onload = () => this.tlo(nivoTla)
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}
