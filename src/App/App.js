import * as THREE from 'three'
import Sizes from '../utils/Sizes'
import Time from '../utils/Time'
import Camera from './Camera'
import Renderer from './Renderer'
import Debug from '../utils/Debug'
import World from './World/World'
import Resources from '../utils/Resources'

import sources from './sources.js'

import Stats from 'three/examples/jsm/libs/stats.module'
import Mouse from '../utils/Mouse'

let instance = null

export default class App {
  constructor(_canvas) {
    if (instance) {
      return instance
    }
    instance = this
    //global access (mainly for console)
    window.app = this

    //HTML Elements
    this.hudElements = {
      circle: document.querySelector('.circle'),
    }

    //Options
    this.canvas = _canvas

    //Setup
    this.debug = new Debug()
    this.sizes = new Sizes()
    this.mouse = new Mouse()
    this.time = new Time()
    this.scene = new THREE.Scene()
    this.resources = new Resources(sources)
    this.camera = new Camera()
    this.renderer = new Renderer()
    this.raycaster = new THREE.Raycaster()

    //stats debug
    if (this.debug.active) {
      this.stats = new Stats()
      document.body.appendChild(this.stats.dom)
    }

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
    if (this.debug.active) {
      this.stats.update()
    }

    this.camera.update()
    this.renderer.update()
    this.world.update()
  }
}
