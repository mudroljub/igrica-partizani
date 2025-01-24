import { keyboard } from '/game-engine/io/Keyboard.js'
import platno from '/game-engine/io/platno.js'
import Vreme from '/game-engine/core/Vreme.js'
import Predmet from '/game-engine/core/Predmet.js'
import { praviEnergiju } from '/game-engine/core/prosirenja/energija.js'
import { praviPucanje } from '/game-engine/core/prosirenja/pucanje.js'
import Granata from '/game-engine/core/projektili/Granata.js'

const gravitacija = 90
const statickoTrenje = 0.3
const kinetickoTrenje = 0.1
const potisakMetka = 500

/* Abstract class */
export default class Tenk extends Predmet {
  constructor(src, {
    cevSlika,
    cilj,
    tenkDesno = false,
    skalar = window.innerWidth > 1280 ? 0.5 : 0.4,
    vremePunjenjaAI = 1500,
    ...rest
  } = {}) {
    super(src, { zapaljiv: true, skalar, ...rest })
    this.tenkDesno = tenkDesno
    this.vremePunjenjaAI = vremePunjenjaAI
    this.cilj = cilj
    this.cev = new Predmet(cevSlika, { skalar })
    this.vreme = new Vreme()
    this.potisak = 25
    this.meci = []
    this.spremno = false
    // AI
    this.ai = false
    this.smer = this.ugao
    this.vremeSile = new Vreme()
    this.vremeSmera = new Vreme()
    this.vremePucanja = new Vreme()
    // proširenja
    Object.defineProperties(this, Object.getOwnPropertyDescriptors(praviEnergiju()))
    Object.assign(this, praviPucanje({ projektil: Granata, vremePunjenja: 1, potisakMetka, gravitacija }))
  }

  get vrhCevi() {
    const x = Math.cos(this.cev.ugao) * this.cev.dijagonala + this.cev.x
    const y = Math.sin(this.cev.ugao) * this.cev.dijagonala + this.cev.y
    return { x, y }
  }

  get ugaoUnazad() {
    return this.ugao + Math.PI
  }

  /* PUCANJE */

  pokusajPucanje(key) {
    if (keyboard.pressed[key]) this.spremno = true
    if (this.spremno && !keyboard.pressed[key]) {
      this.pucaj(this.vrhCevi, this.cev.ugao)
      this.spremno = false
    }
  }

  pucaj(polozaj, ugao) {
    this.pali(polozaj, ugao)
    this.trzaj()
  }

  trzaj() {
    this.dodajSilu(this.potisak, this.ugaoUnazad)
  }

  reagujNaPogodak(steta) {
    this.trzaj()
    this.skiniEnergiju(steta)
  }

  /* AI */

  nisani(predmet) {
    this.cev.ugao = Math.PI + this.razmakDo(predmet) / (gravitacija * gravitacija * 0.8)
  }

  izaberiSmer() {
    if (this.vremeSmera.proteklo > 300) {
      this.smer = Math.random() > 0.4 ? this.ugao : this.ugaoUnazad
      this.vremeSmera.reset()
    }

    if (this.x > platno.width * 0.9) this.smer = this.ugao
    if (this.x < platno.width / 2) this.smer = this.ugaoUnazad
  }

  povremenoDodajSilu() {
    if (this.vremeSile.proteklo > 70) {
      this.dodajSilu(Math.random() * this.potisak, this.smer)
      this.vremeSile.reset()
    }
  }

  mrdajNasumicno() {
    this.izaberiSmer()
    this.povremenoDodajSilu()
  }

  pucajNasumicno() {
    if (this.vremePucanja.proteklo < this.vremePunjenjaAI) return
    this.pucaj(this.vrhCevi, this.cev.ugao)
    this.vremePucanja.reset()
  }

  samohod() {
    if (this.mrtav) return
    this.mrdajNasumicno()
    if (this.cilj.mrtav) return
    this.nisani(this.cilj)
    this.pucajNasumicno()
  }

  /* LOOP */

  update(dt) {
    super.update(dt)
    if (this.ai) this.samohod()
    this.azurirajCev()
    this.trenje(this.brzina > 0.1 ? kinetickoTrenje : statickoTrenje)
    this.proveriPogodak(this.cilj)
  }

  render() {
    this.cev.render() // crta cev iza plamena
    super.render()
  }
}
