import scene from './scene.js'

export default class SceneManager {
  constructor() {
    if (SceneManager.instance) return SceneManager.instance
    this.currentScene = null
    SceneManager.instance = this
  }

  start(key) {
    if (this.currentScene)
      this.currentScene.end()

    const novaScena = new scene[key](this)
    this.currentScene = novaScena
    this.currentScene.start()
  }
}