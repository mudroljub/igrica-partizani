// FIX: da se ne preklapa bombaš sa minama, dodeliti jedinstvene pozicije
// mitraljez puca iz bunkera, prepreke su zakloni
// napraviti smrt (mina eksplodira, vojnik padne)
// sukcesivno se povećava broj prepreka i težina igre

import Scena from '/game-engine/core/Scena.js'
import Vreme from '/game-engine/core/Vreme.js'
import Pozadina from '/game-engine/core/Pozadina.js'
import Bombas from './Bombas.js'
import Bunker from './Bunker.js'
import Prepreka from './Prepreka.js'

const ZADATO_VREME = 10
const BROJ_PREPREKA = 10
const nivo = 1

export default class BombasScena extends Scena {
  init() {
    this.vreme = new Vreme()
    const pozadina = new Pozadina('/assets/slike/teksture/beton.gif')
    this.bombas = new Bombas('/assets/slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif', 50, 55)
    this.bunker = new Bunker()
    this.bunker.onload = () => this.bunker.nemojPreko(this.bombas)
    this.dodaj(pozadina, this.bunker, this.bombas)
    this.praviPrepreke()
  }

  praviPrepreke() {
    this.prepreke = []
    for (let i = 0; i < BROJ_PREPREKA; i++)
      this.prepreke[i] = new Prepreka([this.bunker, this.bombas])

  }

  update() {
    super.update()
    this.proveriVreme()
    this.proveriPobedu()
    this.proveriPrepreke()
  }

  proveriPobedu() {
    if (this.bombas.razmakDo(this.bunker) < 75) {
      this.bunker.gori()
      this.zavrsiIgru('Neprijateljski bunker je uništen.')
    }
  }

  proveriVreme() {
    if (this.vreme.protekloSekundi > ZADATO_VREME)
      this.zavrsiIgru('Tvoje vreme je isteklo. Izgubio si!')

  }

  proveriPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      if (this.bombas.sudara(this.prepreke[i]))
        this.zavrsiIgru('Poginuo si. Igra je završena.')

      this.prepreke[i].update()
    }
  }

  zavrsiIgru(text) {
    this.zavrsniProzor(text)
    setTimeout(() => this.end(), 1000)
  }

  sablon() {
    return `
      <main class='centar'>
        <h3>Dovedi Žikicu Jovanovića Španca do nemačkog bunkera! </h3>
        <div class='tabela'>
          Nivo: ${nivo} <br>
          Vreme: ${Math.floor(this.vreme.protekloSekundi)} <br>
          Prepreke: ${BROJ_PREPREKA}
        </div>
      </main>
    `
  }
}
