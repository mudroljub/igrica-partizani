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
}