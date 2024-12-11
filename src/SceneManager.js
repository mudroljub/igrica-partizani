export default class SceneManager {
    constructor() {
        if (SceneManager.instance) {
            return SceneManager.instance
        }
        this.currentScene = null
        SceneManager.instance = this
    }

    // TODO: refactor da prima sceneName
    start(scene) {
        if (this.currentScene) {
            this.currentScene.end()
        }
        this.currentScene = scene
        this.currentScene.start()
    }
}