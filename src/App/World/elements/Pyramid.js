import * as THREE from 'three'
import App from '../../App'

import { objectMaterial } from '../../../utils/materials/objectMaterial'

export default class Pyramid {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.time = this.app.time
    this.debug = this.app.debug

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('pyramid')
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.ConeGeometry(1, 1, 4)
  }

  setMaterial() {
    this.material = objectMaterial()
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)

    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
    //position
    this.mesh.position.y += 0.5
    this.mesh.position.x = -1.76
    this.mesh.position.z = 1.68

    //Debug
    if (this.debug.active) {
      this.debugFolder
        .add(this.mesh.position, 'x')
        .name('position x')
        .min(-5)
        .max(5)
        .step(0.01)

      this.debugFolder
        .add(this.mesh.position, 'z')
        .name('position z')
        .min(-5)
        .max(5)
        .step(0.01)
    }
  }

  update() {
    this.mesh.rotation.y = Math.sin(this.time.elapsed * 0.0015 + 0.6)
  }
}
