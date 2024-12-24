// prepreke da budu nagazne mine ili nešto opasno
// sukcesivno se povećava broj prepreka i težina igre
// svaki nivo novi random raspored, igrač igra dok ne izgubi
// minimalno rastojanje bombaša i bunkera?
// vremenski ograniceno?
// mitraljez puca iz bunkera, prepreke su zakloni
// BUG: popraviti bunker.gori()

import Scena from 'core/Scena'
import Vreme from 'core/Vreme'
import Pozadina from 'core/Pozadina'
import Bombas from './Bombas'
import Bunker from './Bunker'
import Prepreka from './Prepreka'
import slikaBeton from 'slike/teksture/beton.gif'
import slikaBombas from 'slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif'

const ZADATO_VREME = 50
const BROJ_PREPREKA = 10
let nivo = 1

export default class BombasScena extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.vreme = new Vreme()
    const pozadina = new Pozadina(slikaBeton)
    this.bombas = new Bombas(slikaBombas, 50, 55)
    this.bunker = new Bunker(112, 103)
    this.bunker.nemojPreko(this.bombas)
    this.dodaj(pozadina, this.bunker, this.bombas)
    this.praviPrepreke()
  }

  praviPrepreke() {
    this.prepreke = []
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      this.prepreke[i] = new Prepreka([this.bunker, this.bombas])
    }
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
    if (this.vreme.protekloSekundi > ZADATO_VREME) {
      this.zavrsiIgru('Tvoje vremeIgre je isteklo. Igra je završena!')
    }
  }

  proveriPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      if (this.bombas.sudara(this.prepreke[i])) {
        this.zavrsiIgru('Poginuo si. Igra je završena.')
      }
      this.prepreke[i].update()
    }
  }

  zavrsiIgru(text) {
    this.stop()
    this.endScreen(text)
  }

  sablon() {
    return `
      <main class='centar'>
        <h1>Bombaš</h1>
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
