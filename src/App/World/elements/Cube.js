import * as THREE from 'three'
import App from '../../App'

export default class Cube {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.time = this.app.time
    this.debug = this.app.debug

    //Debug
    if (this.debug.active) {
      this.debuFolder = this.debug.ui.addFolder('cube')
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: 'white',
    })
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)

    this.mesh.position.y += 0.5
    this.mesh.castShadow = true
  }

  update() {
    this.mesh.rotation.y = Math.sin(this.time.elapsed * 0.001)
  }
}
