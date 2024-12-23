// sukcesivno se povećava broj prepreka i težina igre
// svaki nivo novi random raspored, igrač igra dok ne izgubi
// minimalno rastojanje bombaša i bunkera?
// vremenski ograniceno?
// mitraljez puca iz bunkera, prepreke su zakloni

import Scena from 'core/Scena'
import Vreme from 'core/Vreme'
import Pozadina from 'core/Pozadina'
import UI from 'core/UI'
import Bombas from './Bombas'
import Bunker from './Bunker'
import Prepreka from './Prepreka'
import slikaBeton from 'slike/teksture/beton.gif'
import slikaBombas from 'slike/2d-bocno/partizani/vojnici/bombasi/partizan-bombas.gif'

/*** KONFIG ***/

const ZADATO_VREME = 50
const BROJ_PREPREKA = 10

let nivo = 1

/*** INIT ***/

const endScreen = (poruka, manager) => {
  const div = document.createElement('div')
  div.className = 'prozorce centar'

  const p = document.createElement('p')
  p.textContent = poruka
  div.appendChild(p)

  const btn1 = document.createElement('button')
  btn1.textContent = 'Igraj opet'
  btn1.addEventListener('click', () => manager.start('BombasScena'))
  div.appendChild(btn1)

  const btn2 = document.createElement('button')
  btn2.textContent = 'Glavni meni'
  btn2.addEventListener('click', () => manager.start('MainMenu'))
  div.appendChild(btn2)

  return div
}

const sablon = (vremeIgre) => {
  return `
    <main class='centar'>
      <h1>Bombaš</h1>
      <h3>Dovedi Žikicu Jovanovića Španca do nemačkog bunkera! </h3>
      <div class='tabela'>
        Nivo: ${nivo} <br>
        Vreme: ${Math.floor(vremeIgre)} <br>
        Prepreke: ${BROJ_PREPREKA}
      </div>
    </main>
  `
}

const vreme = new Vreme()
const pozadina = new Pozadina(slikaBeton)
const bombas = new Bombas(slikaBombas, 50, 55)
const bunker = new Bunker(112, 103)
bunker.nemojPreko(bombas)

export default class BombasScena extends Scena {
  constructor(...args) {
    super(...args)
    this.init()
  }

  init() {
    this.vremeIgre = 0
    this.ui = new UI(() => sablon(this.vremeIgre), 'ui')
    
    this.dodaj(pozadina, bunker, bombas)
    this.praviPrepreke()
  }

  praviPrepreke() {
    this.prepreke = []
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      this.prepreke[i] = new Prepreka([bunker, bombas])
    }
  }  

  update() {
    super.update()
    this.proveriVreme()
    this.proveriPobedu()
    this.proveriPrepreke()
  }

  render() {
    super.render()
    this.ui.render()
  }

  proveriPobedu() {
    if (bombas.razmakDo(bunker) < 75) {
      bunker.gori()
      this.zavrsiIgru('Neprijateljski bunker je uništen.')
    }
  }

  proveriVreme() {
    this.vremeIgre = vreme.protekloSekundi
    if (this.vremeIgre > ZADATO_VREME) {
      this.zavrsiIgru('Tvoje vremeIgre je isteklo. Igra je završena!')
    }
  }

  proveriPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      if (bombas.sudara(this.prepreke[i])) {
        this.zavrsiIgru('Poginuo si. Igra je završena.')
      }
      this.prepreke[i].update()
    }
  }

  zavrsiIgru(text) {
    this.stop()
    this.ui.element.appendChild(endScreen(text, this.manager))
  }
}
