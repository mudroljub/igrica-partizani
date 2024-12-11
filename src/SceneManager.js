import scene from './rute.js'

export default class SceneManager {
    constructor() {
        if (SceneManager.instance) {
            return SceneManager.instance
        }
        this.currentScene = null
        SceneManager.instance = this
    }

    start(name) {
        if (this.currentScene) {
            this.currentScene.end()
        }
        this.currentScene = new scene[name](this)
        this.currentScene.start()
    }
}