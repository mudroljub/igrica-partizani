import Scena from 'core/Scena.js'

const items = { 
  BombasScena: "Bombaš", 
  NemciIzRovova: "Nemci iz rovova", 
  Avionce1942: "Avionče 1942", 
  TenkOdozgoScena: "Tenk odozgo", 
  TopScena: "Artiljerija", 
  MinobacacScena: "Minobacač", 
  CamacScena: "Čamac", 
  OtpisaniScena: "Ubij okupatora!", 
  Scena1944: "Avionče 1944", 
  TenkicIde: "Tenkić ide",
  Ranjenik: "Ranjenik",
  JasenovacScena: "Bekstvo iz Jasenovca"
}

export default class MainMenu extends Scena {
  constructor(...args) {
    super(...args)
    this.pustiScenu = this.pustiScenu.bind(this)
  }

  start() {
    super.start()
    document.addEventListener('click', this.pustiScenu)
  }

  pustiScenu(e) {
    if (!e.target.classList.contains('js-start')) return

    this.ui.manager.start(e.target.value)
  }

  sablon() {
    const izbornik = Object.entries(items).map(([kljuc, naziv]) =>
      `<button value='${kljuc}' class='js-start full'>${naziv}</button>`
    ).join('')
  
    return `
      <h1>Partisan Games ★</h1>
      ${izbornik}
    `
  }  

  end() {
    super.end()
    document.removeEventListener('click', this.pustiScenu)
    this.ui.clear()
  }
}