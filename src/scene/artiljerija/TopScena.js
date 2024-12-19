import Scena from 'core/Scena'
import UI from 'core/UI'
import Top from './Top'

// top je rezervisano
let haubica
let interfejs

const sablon = () => {
  return `
  <div>
    ugao: ${haubica.ugao}<br>
    brzina: ${haubica.brzina}
  </div>
  `
}

export default class TopScena extends Scena {
  constructor() {
    super()
    haubica = new Top()
    interfejs = new UI(sablon)
    this.dodaj(haubica, interfejs)
    this.start()
  }
}
