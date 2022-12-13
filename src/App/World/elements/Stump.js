import * as THREE from 'three'
import { objectMaterial } from '../../../utils/materials/objectMaterial'

import App from '../../App'

export default class Stump {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.resources = this.app.resources
    this.time = this.app.time

    //debug
    this.debug = this.app.debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Stump')
    }

    //Setup
    console.log(this.resources.items.stumpModel)
    this.resource = this.resources.items.stumpModel

    this.setMaterial()
    this.setModel()
  }

  setMaterial() {
    this.material = objectMaterial()
  }

  setModel() {
    this.model = this.resource.scene
    this.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.material
        child.castShadow = true
        child.receiveShadow = true
      }
    })

    this.model.position.set(-2.31, this.model.position.y, -1.794)

    if (this.debug.active) {
      this.debugFolder
        .add(this.model.position, 'x')
        .min(-3)
        .max(3)
        .name('position X')
      this.debugFolder
        .add(this.model.position, 'z')
        .min(-3)
        .max(3)
        .name('position Z')
    }
  }
  update() {
    this.model.rotation.y = Math.sin()
  }
}
