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
    this.setAmbientLight()
    this.setSunlight()
    this.setWallLight()
  }

  setAmbientLight() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    this.scene.add(this.ambientLight)

    if (this.debug.active) {
      this.debugAmbient = this.debugFolder.addFolder('ambientLight')
      this.debugAmbient
        .add(this.ambientLight, 'intensity')
        .min(0)
        .max(1)
        .name('ambient light intensity')
    }
  }

  setSunlight() {
    this.sunlight = new THREE.DirectionalLight('#ffffff', 4)
    this.sunlight.castShadow = true
    this.sunlight.shadow.camera.far = 15
    this.sunlight.shadow.mapSize.set(1024, 1024)
    this.sunlight.shadow.normalBias = 0.05
    this.sunlight.position.set(-2.329, 1.335, -2.722)
    this.scene.add(this.sunlight)

    //Debug
    if (this.debug.active) {
      this.debugSunlight = this.debugFolder.addFolder('spotlight')
      this.debugSunlight
        .add(this.sunlight, 'intensity')
        .name('sunlghtIntensity')
        .min(0)
        .max(10)
        .step(0.001)

      this.debugSunlight
        .add(this.sunlight.position, 'x')
        .name('sunlghtX')
        .min(-5)
        .max(5)
        .step(0.001)
      this.debugSunlight
        .add(this.sunlight.position, 'y')
        .name('sunlghtY')
        .min(-5)
        .max(5)
        .step(0.001)
      this.debugSunlight
        .add(this.sunlight.position, 'z')
        .name('sunlghtZ')
        .min(-5)
        .max(5)
        .step(0.001)
    }
  }

  setWallLight() {
    this.wallLight = new THREE.PointLight('#FFFFFF', 1)
    this.scene.add(this.wallLight)

    //position
    this.wallLight.position.set(-4, 5, -4)

    if (this.debug.active) {
      this.wallLightHelper = new THREE.PointLight(this.wallLight)
      this.scene.add(this.wallLightHelper)
      this.debugWallLight = this.debugFolder.addFolder('wallLight')
      this.debugWallLight
        .add(this.wallLight.position, 'x')
        .min(-5)
        .max(5)
        .name('walllight X')
      this.debugWallLight
        .add(this.wallLight.position, 'y')
        .min(-20)
        .max(20)
        .name('walllight Y')
      this.debugWallLight
        .add(this.wallLight.position, 'z')
        .min(-5)
        .max(5)
        .name('walllight Z')

      this.debugWallLight.add(this.wallLight, 'intensity').min(0).max(20)
    }
  }
}
