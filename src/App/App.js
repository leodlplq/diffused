import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import Debug from '../utils/Debug'
import World from './World/World'

let instance = null

export default class App {
  constructor(_canvas) {
    if (instance) {
      return instance
    }
    instance = this
    //global access (mainly for console)
    window.app = this

    //Options
    this.canvas = _canvas

    //Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.renderer = new Renderer()

    //world
    this.world = new World()

    //events
    this.sizes.on('resize', () => {
      this.resize()
    })
    this.time.on('tick', () => {
      this.update()
    })
  }

  resize() {
    this.camera.resize()
    this.renderer.resize()
  }

  update() {
    this.camera.update()
    this.renderer.update()
    this.world.update()
  }
}
