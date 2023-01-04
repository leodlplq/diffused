import * as THREE from 'three'
import App from '../../App'
import HUD from '../HUD'
import MeshEventDetector from '../../../utils/MeshEventDetector'

import { objectMaterial } from '../../../utils/materials/objectMaterial'

export default class Pyramid {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.time = this.app.time
    this.debug = this.app.debug

    this.raycaster = this.app.raycaster
    this.camera = this.app.camera
    this.mouse = this.app.mouse

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('pyramid')
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setHUD()

    this.setHovering()
    this.meshHoverDetector.on('mouseentermesh', () => this.hover())
    this.meshHoverDetector.on('mouseleavemesh', () => this.leaveHover())
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
    //scale
    this.mesh.scale.set(0.903, 1.5, 0.5)
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

      this.debugFolder
        .add(this.mesh.scale, 'y')
        .min(0.5)
        .max(4)
        .name('height')
        .onChange(() => (this.mesh.position.y = this.mesh.scale.y / 2))
      this.debugFolder.add(this.mesh.scale, 'x').min(0.5).max(4).name('width')
      this.debugFolder.add(this.mesh.scale, 'z').min(0.5).max(4).name('depth')
    }
  }

  setHUD() {
    this.hud = new HUD(this.mesh, true)
  }

  setHovering() {
    this.meshHoverDetector = new MeshEventDetector(
      this.mesh,
      this.raycaster,
      this.camera.instance,
      this.mouse,
    )
  }

  hover() {
    console.log('hover')
  }

  leaveHover() {
    console.log('leave hover')
  }

  update() {
    this.hud.update()
    this.meshHoverDetector.update()
    // this.mesh.rotation.y = Math.sin(this.time.elapsed * 0.0015 + 0.6)
  }
}
