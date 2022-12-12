import * as THREE from 'three'
import App from '../../App'

export default class Floor {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
  }

  setGeometry() {
    this.geometry = new THREE.CircleGeometry(5, 64)
  }

  setMaterial() {
    this.material = new THREE.MeshStandardMaterial({
      color: 'white',
    })
  }
  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.mesh.rotation.x = -Math.PI * 0.5
    this.mesh.receiveShadow = true
    this.scene.add(this.mesh)
  }
}
