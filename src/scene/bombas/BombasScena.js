// napraviti css ui i uvek njega koristiti
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

const ZADATOVREME = 50
const BROJ_PREPREKA = 10
const prepreke = []
let nivo = 1
let vremeIgre = 0

/*** INIT ***/

const endScreen = (poruka, manager) => {
  const div = document.createElement('div')
  div.className = 'prozorce centar'

  const p = document.createElement('p')
  p.textContent = poruka
  div.appendChild(p)

  const igrOpet = document.createElement('button')
  igrOpet.textContent = 'Igraj opet'
  div.appendChild(igrOpet)

  const glMeni = document.createElement('button')
  glMeni.textContent = 'Glavni meni'
  div.appendChild(glMeni)

  return div
}

const sablon = () => {
  return `
    <main class='centar'>
      <h1>${BombasScena.naziv}</h1>
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

const praviPrepreke = () => {
  for (let i = 0; i < BROJ_PREPREKA; i++) {
    prepreke[i] = new Prepreka([bunker, bombas])
  }
}

export default class BombasScena extends Scena {
  static get naziv() {
    return 'Bombaš'
  }

  constructor(...args) {
    super(...args)
    this.ui = new UI(() => sablon(), 'ui')
    this.dodaj(pozadina, bunker, bombas)
    praviPrepreke()
  }

  update() {
    super.update()
    // bombas.pratiMisha()
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
    vremeIgre = vreme.protekloSekundi
    if (vremeIgre > ZADATOVREME) {
      this.zavrsiIgru('Tvoje vremeIgre je isteklo. Igra je završena!')
    }
  }

  proveriPrepreke() {
    for (let i = 0; i < BROJ_PREPREKA; i++) {
      if (bombas.sudara(prepreke[i])) {
        this.zavrsiIgru('Poginuo si. Igra je završena.')
      }
      prepreke[i].update()
    }
  }

  zavrsiIgru(text) {
    this.stop()
    document.body.appendChild(endScreen(text, this.manager))
  }
}
