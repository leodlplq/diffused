import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import App from './App'

export default class Camera {
  constructor() {
    this.app = new App()
    this.sizes = this.app.sizes
    this.scene = this.app.scene
    this.canvas = this.app.canvas

    this.setInstance()
    this.setOrbitControls()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100,
    )
    this.instance.position.set(6, 4, 8)
    this.scene.add(this.instance)
  }

  setOrbitControls() {
    this.controls = new OrbitControls(this.instance, this.canvas)
    this.controls.enableDamping = true

    //Limit displacement
    //vertical span
    this.controls.maxPolarAngle = Math.PI * 0.5 - 0.1
    //horizontal span
    this.controls.minAzimuthAngle = -0.004690102875165628
    this.controls.maxAzimuthAngle = 1.6722480568658393
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height
    this.instance.updateProjectionMatrix()
  }

  update() {
    this.controls.update()
    console.log(this.controls.getAzimuthalAngle())
  }
}
