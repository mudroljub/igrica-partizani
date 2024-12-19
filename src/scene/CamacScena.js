// srediti boju pozadine
// beskonačan ekran nadesno
// mozda ubaciti obale da promiču
// nailazi na prepreke, stenje, brodolomnike, čamce, krstarice, brodove....

import Scena from 'core/Scena'
import CamacIgracOdozgo from '../2d-odozgo/CamacIgracOdozgo'

export default class CamacScena extends Scena {
  constructor() {
    super()
    this.bojaPozadine = '#000066'
    const camac = new CamacIgracOdozgo()
    this.dodaj(camac)
  }
}
