import scene from './scene.js'

export default class SceneManager {
    constructor() {
        if (SceneManager.instance) {
            return SceneManager.instance
        }
        this.currentScene = null
        SceneManager.instance = this
    }

    start(key) {
        if (this.currentScene) {
            this.currentScene.end()
        }
        this.currentScene = new scene[key](this)
        this.currentScene.start()
    }

    endScreen(poruka = 'Igra je završena.', ovaScena = '') {
        const div = document.createElement('div')
        div.className = 'prozorce centar'
      
        const p = document.createElement('p')
        p.textContent = poruka
        div.appendChild(p)
      
        if (ovaScena) {
            const btn1 = document.createElement('button')
            btn1.textContent = 'Igraj opet'
            btn1.addEventListener('click', () => this.start(ovaScena))
            div.appendChild(btn1)    
        }

        const btn2 = document.createElement('button')
        btn2.textContent = 'Glavni meni'
        btn2.addEventListener('click', () => this.start('MainMenu'))
        div.appendChild(btn2)
      
        return div
      }      
}