import {
  izasaoDole, izasaoGore, izasaoDesno, izasaoLevo, izasaoLevoSkroz, izasaoDesnoSkroz, izasaoIgde
} from '/game-engine/utils/granice.js'
import Slika from './Slika.js'
import { platno } from '../io/platno.js'
import mish from '../io/mish.js'
import { randomRange } from '../utils.js'
import { sudar } from '../utils/sudari.js'

export default class Predmet extends Slika {

  constructor(src, sirina, visina, x, y, skalar) {
    super(src, { sirina, visina, x, y, skalar })
    this.ziv = true
    this.vidljiv = true
    this.brzina = 0
    this.oznake = new Set()
  }

  set zapaljiv(bul) {
    if (bul) import('./Plamen.js')
      .then(module => {
        this.plamen = new module.default()
      })
  }

  get zapaljiv() {
    return Boolean(this.plamen)
  }

  /* POLOZAJ */

  postaviRandom() {
    this.polozaj(Math.random() * platno.width, Math.random() * platno.height)
  }

  randomX(pocetnoX = this.sirina / 2, zavrsnoX = platno.width - this.sirina / 2) {
    this.x = randomRange(pocetnoX, zavrsnoX)
  }

  randomY(pocetnoY = this.visina / 2, zavrsnoY = platno.height - this.visina / 2) {
    this.y = randomRange(pocetnoY, zavrsnoY)
  }

  postaviRandomUredno() { // ne viri sa platna
    this.randomX()
    this.randomY()
  }

  /* KRETANJE */

  get brzina() {
    return Math.sqrt(this.dx * this.dx + this.dy * this.dy)
  }

  set brzina(jacina) {
    this.dx = jacina * Math.cos(this.ugao)
    this.dy = jacina * Math.sin(this.ugao)
  }

  dodajSilu(jacina, ugao = this.ugao) {
    this.dx += jacina * Math.cos(ugao)
    this.dy += jacina * Math.sin(ugao)
  }

  pomeri(razmak) {
    this.x += razmak * Math.cos(this.ugao)
    this.y += razmak * Math.sin(this.ugao)
  }

  stani() {
    this.brzina = 0
  }

  /* UGLOVI */

  skreni(noviUgao) {
    this.ugao = noviUgao
    this.brzina = this.brzina // ažurira pravac kretanja
  }

  ugaoKa(predmet) {
    const mojX = this.x + this.sirina / 2
    const mojY = this.y + this.visina / 2
    const tudjX = predmet.x + predmet.sirina / 2
    const tudjY = predmet.y + predmet.visina / 2
    return Math.atan2(tudjY - mojY, tudjX - mojX)
  }

  /* VIDLJIVOST */

  pokazi() {
    this.vidljiv = true
  }

  sakrij() {
    this.vidljiv = false
  }

  nestani() {
    this.sakrij()
    this.stani()
  }

  /* STANJE */

  get mrtav() {
    return !this.ziv
  }

  set slikaMrtav(src) {
    this._slikaMrtav = src
  }

  get slikaMrtav() {
    return this._slikaMrtav
  }

  umri() {
    this.stani()
    if (this.slikaMrtav) this.zameniSliku(this.slikaMrtav)
    this.ziv = false
  }

  /* KOLIZIJA */

  sudara(predmet) {
    if (!this.vidljiv || !predmet.vidljiv) return false
    return sudar(this, predmet)
  }

  razmakDo(predmet) {
    const razlikaX = this.x - predmet.x
    const razlikaY = this.y - predmet.y
    return Math.sqrt((razlikaX * razlikaX) + (razlikaY * razlikaY))
  }

  /* MISH */

  pratiMisha() {
    this.x = mish.x - platno.offsetLeft
    this.y = mish.y - platno.offsetTop
  }

  /* GRANICE */

  proveriGranice() {
    if (this.granice) this.granice()
  }

  kruzi(procenat = 1) {
    if (Math.random() > procenat) return
    if (izasaoLevoSkroz(this)) this.x = platno.width + this.sirina / 2
    if (izasaoDesnoSkroz(this)) this.x = 0
    if (izasaoDole(this)) this.y = 0
    if (izasaoGore(this)) this.y = platno.height
  }

  kruziSire() {
    const sirina = platno.width
    if (this.x < -sirina) this.x = platno.width + sirina
  }

  vracaVodoravno(procenatVracanja) {
    const procenat = procenatVracanja || this.procenatVracanja
    if (izasaoLevoSkroz(this) && Math.random() < procenat) this.x = platno.width + this.sirina / 2
  }

  odbij() {
    if (izasaoGore(this) || izasaoDole(this))
      this.skreni(2 * Math.PI - this.ugao)
    if (izasaoLevo(this) || izasaoDesno(this))
      this.skreni(Math.PI - this.ugao)
    if (izasaoIgde(this))
      this.pomeri(5)
  }

  staje() {
    if (izasaoIgde(this)) this.stani()
  }

  nestaje() {
    if (izasaoIgde(this)) this.nestani()
  }

  ogranici() {
    const marginaLevo = this.sirina / 4
    const marginaDesno = platno.width - marginaLevo
    const marginaGore = this.visina / 2
    const marginaDole = platno.height - marginaGore
    if (this.x <= marginaLevo) this.x = marginaLevo
    if (this.x >= marginaDesno) this.x = marginaDesno
    if (this.y <= marginaGore) this.y = marginaGore
    if (this.y >= marginaDole) this.y = marginaDole
  }

  /* DEBUG */

  log() {
    const x = this.x.toFixed()
    const y = this.y.toFixed()
    const dx = this.dx.toFixed(2)
    const dy = this.dy.toFixed(2)
    const brzina = this.brzina.toFixed(2)
    const ugao = this.ugao.toFixed(2)
    console.log(`x: ${x}, y: ${y}, dx: ${dx}, dy: ${dy}, brzina: ${brzina}, ugao: ${ugao}, ziv: ${this.ziv}`)
  }

  /* LOOP */

  update(dt) {
    if (this.dx || this.dy) {
      this.x += this.dx
      this.y += this.dy
      this.proveriGranice()
    }

    if (this.vidljiv) this.render(dt)

    if (this.mrtav && this.zapaljiv) {
      this.plamen.x = this.x
      this.plamen.y = this.y
      this.plamen.update()
      this.plamen.render()
    }
  }
}
