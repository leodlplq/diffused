import * as THREE from 'three'
import App from '../App'

export default class Environment {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene

    //Debug
    this.debug = this.app.debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('environment')
    }

    //Setup
    this.setSunlight()
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight('#ffffff', 4)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 15
    this.sunlight.shadow.mapSize.set(1024, 1024)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(3.5, 2, 0.821)
    this.scene.add(this.sunlight)

    //Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.sunlight, 'intensity')
        .name('sunlghtIntensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugFolder
        .add(this.sunlight.position, 'x')
        .name('sunlghtX')
        .min(-5)
        .max(5)
        .step(0.001)
      this.debugFolder
        .add(this.sunlight.position, 'y')
        .name('sunlghtY')
        .min(-5)
        .max(5)
        .step(0.001)
      this.debugFolder
        .add(this.sunlight.position, 'z')
        .name('sunlghtZ')
        .min(-5)
        .max(5)
        .step(0.001)
    }
  }
}
