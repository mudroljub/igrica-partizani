// avion Potez 25

import * as $ from 'konstante'
import tipke from 'io/tipke'
import platno from 'io/platno'
import Scena from 'core/Scena'
import AvionIgrac from './AvionIgrac'
import Hummel from './Hummel'
import Zgrada from './Zgrada'
import Oblak from 'src/2d-bocno/Oblak'
import Zbun from 'src/2d-bocno/Zbun'
import Shuma from 'src/2d-bocno/Shuma'
import slikaAerodrom from 'slike/2d-bocno/zgrade/aerodrom.png'
import slikaRuina from 'slike/2d-bocno/zgrade/ruina.png'

/*** KONFIG ***/

const nivoTla = platno.height
const zbunovi = []
const oblaci = []
const shume = []
const BROJ_OBLAKA = 3
const BROJ_ZBUNOVA = 10
const BROJ_SHUME = 10
const PARALAX_1 = -5
const PARALAX_2 = -3
const PARALAX_3 = -1
const PARALAX_4 = -0.5
const POTISAK = 0.3
const MIN_UBRZANOST = 7
const MAX_UBRZANOST = 20
const DIZAJ = 10
const MAX_DIGNUTOST = 5555

let ubrzanostScene = 0
let dignutostScene = 0

/*** INIT ***/

const vozilo = new Hummel(nivoTla)
const aerodrom = new Zgrada(nivoTla, slikaAerodrom)
const ruina = new Zgrada(nivoTla, slikaRuina)
let igrac

export default class Avionce1942 extends Scena {
  constructor() {
    super()
    this.nivoTla = nivoTla
    igrac = new AvionIgrac(this)
    ruina.x = -ruina.sirina
    ruina.procenatVracanja = 0.01
    aerodrom.procenatVracanja = 0.001
    // napraviti fabriku
    for (let i = 0; i < BROJ_OBLAKA; i++) oblaci[i] = new Oblak()
    for (let i = 0; i < BROJ_ZBUNOVA; i++) zbunovi[i] = new Zbun()
    for (let i = 0; i < BROJ_SHUME; i++) shume[i] = new Shuma()
    this.dodaj(igrac, vozilo, aerodrom, ruina, ...oblaci, ...zbunovi, ...shume)
    this.pocniParalax()
  }

  update() {
    this.crtaNebo(this.nivoTla + dignutostScene, 'blue', 'lightblue', dignutostScene)
    super.update()
    this.proveriTipke()
    vozilo.patroliraj()
    this.proveriTlo()
    this.proveriSmrt()
  }

  proveriTipke() {
    if (!igrac.ziv) return
    if (tipke.stisnute[$.D] && ubrzanostScene < MAX_UBRZANOST) this.ubrzavaPredmete($.KRUZNICA/2, POTISAK)
    if (tipke.stisnute[$.A] && ubrzanostScene >= MIN_UBRZANOST) this.ubrzavaPredmete($.KRUZNICA/2, -POTISAK)
    if (tipke.stisnute[$.W] && dignutostScene - DIZAJ < MAX_DIGNUTOST) {
      if (igrac.y < this.visina * 3/4) this.dizePredmete(DIZAJ)
      if (ubrzanostScene === 0) this.pocniParalax() // kada avion ponovo uzlece
    }
    if (tipke.stisnute[$.S] && dignutostScene - DIZAJ >= 0) {
      if (igrac.y > this.visina / 4) this.dizePredmete(-DIZAJ)
    }
  }

  pocniParalax() {
    zbunovi.map(zbun => zbun.dx = PARALAX_1)
    ruina.dx = PARALAX_2
    aerodrom.dx = PARALAX_3
    shume.map(shuma => shuma.dx = PARALAX_3)
    oblaci.map(oblak => oblak.dx = PARALAX_4)
  }

  zaustaviParalax() {
    igrac.sviOstali(predmet => {
      if (!('neprijatelj' in predmet.oznake)) predmet.dx *= 0.9
    })
    ubrzanostScene = 0
  }

  ubrzavaPredmete(ugao, pomak) {
    igrac.sviOstali(predmet => predmet.dodajSilu(pomak, ugao))
    ubrzanostScene += pomak
  }

  dizePredmete(pomak) {
    igrac.sviOstali(predmet => predmet.y += pomak)
    dignutostScene += pomak
  }

  proveriSmrt() {
    igrac.sviOstali(predmet => {
      if (predmet.mrtav) predmet.dx = PARALAX_1 - ubrzanostScene
    })
    if (igrac.mrtav && dignutostScene > 0) this.dizePredmete(-DIZAJ)
  }

  proveriTlo() {
    if (igrac.jePrizemljen() && dignutostScene === 0) this.zaustaviParalax()
  }
}
