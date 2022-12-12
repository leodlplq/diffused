import App from '../App'
import Cube from './elements/Cube'
import Floor from './elements/Floor'
import Room from './elements/Room'
import Environment from './Environement'

export default class World {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene

    // this.floor = new Floor()
    this.room = new Room()
    this.cube = new Cube()
    this.environment = new Environment()
  }

  update() {
    this.cube.update()
  }
}
