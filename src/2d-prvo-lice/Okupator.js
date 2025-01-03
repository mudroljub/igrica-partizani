import Animiran from '/game-engine/core/Animiran.js'
import platno from '/game-engine/io/platno.js'
import mish from '/game-engine/io/mish.js'

export default class Okupator extends Animiran {
  constructor() {
    super ('/assets/slike/sprajtovi/okupator-sprite.png', {
      imena: ['nagore', 'nadole', 'nalevo', 'nadesno', 'umire'], duzine: 5, sirina: 50, visina: 180
    })
    this.brzina = 4
    this.limitLevo = platno.width * .15
    this.limitDesno = platno.width * .85
    this.polozaj(this.limitLevo, platno.height * .75)
  }

  patroliraj() {
    if (this.x <= this.limitLevo) this.hodaj('nadesno', 0)
    if (this.x >= this.limitDesno) this.hodaj('nalevo', Math.PI)
  }

  hodaj(naziv, ugao) {
    if (!this.animacije) return
    this.pustiAnimaciju(naziv)
    this.skreni(ugao)
  }

  proveriPogodak() {
    if (mish.iznad(this)) this.umri()
  }

  umri() {
    super.umri()
    this.pustiAnimaciju('umire', false)
  }
}
