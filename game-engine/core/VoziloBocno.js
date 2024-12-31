import Predmet from '/game-engine/core/Predmet.js'
import Raketa from '../../src/scene/avionce1942/Raketa.js'

export default class VoziloBocno extends Predmet {
  constructor(src, x, y, skalar) {
    super(src, undefined, undefined, x, y, skalar)
    this.onload = () => this.y = y - this.visina / 2
    this.dodajSilu(3)
    this.zapaljiv = true
    this.sansaPucnja = 0.01
    this.oznake.add('neprijatelj')
    this.neprijatelji = [] // treba raketi
    this.raketa = new Raketa(this)
    this.raketa.cilj = 'igrac'
  }

  patroliraj() {
    if (this.mrtav) return

    if (this.x <= 150)
      this.skreni(0)

    if (this.x >= 600)
      this.skreni(Math.PI)
  }

  pucaPratecu() {
    this.raketa.pucaPratecu()
  }

  povremenoPucaPratecu() {
    if (!this.ziv) return
    if (Math.random() < this.sansaPucnja) this.pucaPratecu()
  }

  update(dt) {
    super.update(dt)
    this.patroliraj(dt)
    this.skalarY = this.ugao === Math.PI ? -1 : 1
    this.raketa.update()
    this.lastX = this.x
  }
}
