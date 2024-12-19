
import {sakrijPlatno, pokaziPlatno} from 'io/platno.js'
import SceneManager from './SceneManager.js'

/*
let aktivnaScena = null

const pustiScenu = function(e) {
  if (!e.target.classList.contains('js-start')) return
  if (aktivnaScena) aktivnaScena.end()
    
  pokaziPlatno()
  glavniMeni.clear()
  aktivnaScena = new scene[e.target.value]()
  aktivnaScena.start()
}

const glavniMeni = new UI(sablon, 'ui')
glavniMeni.render()
sakrijPlatno()

- manager treba svakoj sceni
- ima ga samo MainMenu (prosleđuje mu se ovde)
- PROBLEM: kako ga proslediti Bombasu?
- PROBLEM: ne možemo ga proslediti Sceni jer MainMenu nasleđuje Scenu (cirkularna zavisnost)
*/

const manager = new SceneManager()
manager.start('MainMenu')