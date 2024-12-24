import Scena from 'core/Scena'
import Top from './Top'

export default class TopScena extends Scena {
  constructor(...args) {
    super(...args)
    this.top = new Top()
    this.dodaj(this.top)
    this.start()
  }

  sablon() {
    return `
    <div>
      ugao: ${this.top.ugao}<br>
      brzina: ${this.top.brzina}
    </div>
    `
  }  
}
