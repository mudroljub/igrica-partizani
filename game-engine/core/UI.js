export default class UI {
  constructor(manager) {
    this.upamcen = ''
    this.element = document.getElementById('ui')
    this.prozor = document.getElementById('prozor')
    this.manager = manager
  }

  render() {
    if (!this.sablon) return
    if (this.upamcen !== this.sablon()) {
      this.element.innerHTML = this.sablon()
      this.upamcen = this.sablon()
    }
  }

  clear() {
    this.element.innerHTML = ''
  }

  endScreen(poruka = 'Igra je završena.', imeScene = '') {
    if (this.prozor.innerHTML) return

    const start = scena => {
      this.manager.start(scena)
      this.prozor.innerHTML = ''
    }

    const dodajDugme = (txt, callback) => {
      const btn = document.createElement('button')
      btn.textContent = txt
      btn.addEventListener('click', callback)
      this.prozor.appendChild(btn)    
    }

    const p = document.createElement('p')
    p.textContent = poruka
    this.prozor.appendChild(p)
  
    dodajDugme('Igraj opet', () => start(imeScene))
    dodajDugme('Glavni meni', () => start('MainMenu'))
  }
}