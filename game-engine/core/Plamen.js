import { platno } from '../io/platno.js'

const brzina = 120
const velicina = 20
const zivotniVek = 1.25
const cesticaPoSekundi = 200

class Iskra {
  constructor(x, y, dx, dy) {
    this.x = x
    this.y = y
    this.dx = dx
    this.dy = dy
    this.vreme = 0
    this.ctx = platno.getContext('2d')
  }

  update(dt) {
    this.x += this.dx * dt
    this.y += this.dy * dt
    this.vreme += dt
  }

  render() {
    const red = 260 - this.vreme * 2
    const green = this.vreme * 2 + 50
    const blue = this.vreme * 2
    const opacity = (zivotniVek - this.vreme) / zivotniVek * 0.4
    this.ctx.fillStyle = `rgba(${red}, ${green}, ${blue}, ${opacity})`
    this.ctx.beginPath()
    const radius = (zivotniVek - this.vreme) / zivotniVek * velicina / 2 + velicina / 2
    this.ctx.arc(this.x, this.y, radius, 0, 2 * Math.PI)
    this.ctx.fill()
  }
}

export default class Plamen {
  constructor(x = 200, y = 200) {
    this.iskre = []
    this.x = x
    this.y = y
    this.ctx = platno.getContext('2d')
  }

  stvaraj(dt) {
    const cesticaPoKrugu = Math.round(cesticaPoSekundi * dt)
    for (let i = 0; i < cesticaPoKrugu; i++) {
      const dx = (Math.random() * 2 * brzina - brzina) / 2
      const dy = 0 - Math.random() * 2 * brzina
      this.iskre.push(new Iskra(this.x, this.y, dx, dy))
    }
  }

  update(dt) {
    this.stvaraj(dt)
    this.iskre.forEach(iskra => iskra.update(dt))
    this.iskre = this.iskre.filter(iskra => iskra.vreme < zivotniVek)
  }

  render() {
    this.ctx.globalCompositeOperation = 'lighter'
    this.iskre.forEach(iskra => iskra.render())
    this.ctx.globalCompositeOperation = 'source-over'
  }
}
