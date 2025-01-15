import Predmet from '/game-engine/core/Predmet.js'
import { randomInRange } from '/game-engine/utils.js'

export default class Metak extends Predmet {
  constructor({ src = 'granata.gif', skalar = .5, potisak = 1000, ...rest } = {}) {
    super(src, { skalar, ...rest })
    this.potisak = potisak
    this.steta = randomInRange(10, 20)
    this.reset()
  }

  reset() {
    this.nestani()
  }

  postavi(polozaj, ugao) {
    this.polozaj = polozaj
    this.ugao = ugao
  }

  pali(polozaj, ugao, potisak = this.potisak) {
    this.postavi(polozaj, ugao)
    this.pokazi()
    this.dodajSilu(potisak)
  }

  proveriGranice() {
    if (this.vanEkrana) this.reset()
  }

  proveriPogodak(cilj, callback) {
    if (this.nijePrikazan || !cilj.sudara(this)) return

    this.povredi(cilj, callback)
  }

  povredi(cilj, callback) {
    if (cilj.reagujNaPogodak)
      cilj.reagujNaPogodak(this.steta)
    else
      cilj.umri()
    this.reset()
    if (callback) callback()
  }
}
