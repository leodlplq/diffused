import App from '../App'
import Cube from './elements/Cube'
import Floor from './elements/Floor'
import Room from './elements/Room'
import Environment from './Environement'
import Pyramid from './elements/Pyramid'
import Stump from './elements/Stump'

export default class World {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.resources = this.app.resources

    //setup
    this.resources.on('ready', () => {
      this.room = new Room()
      this.stump = new Stump()
      this.cube = new Cube()
      this.pyramid = new Pyramid()
      this.environment = new Environment()

      this.stump.meshHoverDetector.on('mouseclickmesh', () => this.destroy())
      this.cube.meshHoverDetector.on('mouseclickmesh', () => this.destroy())
      this.pyramid.meshHoverDetector.on('mouseclickmesh', () => this.destroy())
    })
  }

  update() {
    if (this.cube) this.cube.update()
    if (this.pyramid) this.pyramid.update()
    if (this.stump) this.stump.update()
  }

  destroy() {
    this.cube.hud.destroy()
    this.stump.hud.destroy()
    this.pyramid.hud.destroy()
  }
}
