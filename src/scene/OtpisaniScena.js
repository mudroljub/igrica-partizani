// popraviti animaciju na osnovu mini-frp

import UI from 'core/UI'
import Scena from 'core/Scena'
import Pozadina from 'core/Pozadina'
import Okupator from '../2d-prvo-lice/Okupator'
import platno from 'io/platno'
import mish from 'io/mish'
import slikaPozadina from 'slike/pozadine/rusevine-varsava.jpg'
import zvukOtpisani from 'zvuci/otpisani.mp3'

/*** KONFIG ***/

const sablon = () => `
<main class='centar'>
  <h1>Ubij okupatora!</h1>
  <p>Oslobođenje se bliži</p>
</main>
`

/*** INIT ***/

const pozadina = new Pozadina(slikaPozadina)
const strazar = new Okupator()

/*** EXPORT ***/

export default class OtpisaniScena extends Scena {
  constructor() {
    super()
    mish.dodajNishan()
    this.zvuk = new Audio(zvukOtpisani)
    this.zvuk.play()
    this.dodaj(new UI(sablon))
    platno.addEventListener('click', () => strazar.proveriPogodak())
  }

  update() {
    pozadina.update()
    strazar.patroliraj()
    strazar.update()
  }

  end() {
    super.end()
    mish.ukloniNishan()
    this.zvuk.pause()
  }
}
