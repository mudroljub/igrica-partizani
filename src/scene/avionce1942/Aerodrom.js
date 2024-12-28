import Predmet from '/game-engine/core/Predmet.js'
import { vracaVodoravno } from '/game-engine/akcije/granice.js'

export default class Aerodrom extends Predmet {
  constructor(nivoTla, src = '/assets/slike/2d-bocno/zgrade/aerodrom.png') {
    super(src)
    this.procenatVracanja = 0.001
    this.onload = () => this.tlo(nivoTla)
  }

  proveriGranice() {
    vracaVodoravno(this)
  }
}