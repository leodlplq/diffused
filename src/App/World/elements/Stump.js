import * as THREE from 'three'
import { objectMaterial } from '../../../utils/materials/objectMaterial'

import App from '../../App'
import HUD from '../HUD'
import MeshHoverDetector from '../../../utils/MeshHoverDetector'

export default class Stump {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.resources = this.app.resources
    this.time = this.app.time

    this.raycaster = this.app.raycaster
    this.camera = this.app.camera
    this.mouse = this.app.mouse

    //debug
    this.debug = this.app.debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Stump')
    }

    //Setup
    this.resource = this.resources.items.stumpModel

    this.setMaterial()
    this.setModel()
    this.setHUD()

    this.setHovering()
    this.meshHoverDetector.on('mouseentermesh', (e) => this.hover(e))
    this.meshHoverDetector.on('mouseleavemesh', () => this.leaveHover())
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

  setHUD() {
    this.hud = new HUD(this.model, false)
  }

  setHovering() {
    console.log(this.model)
    this.meshHoverDetector = new MeshHoverDetector(
      this.model.children[0],
      this.raycaster,
    )
  }

  hover(e) {
    console.log('hover', e)
  }

  leaveHover() {
    console.log('leave hover')
  }

  update() {
    this.hud.update()
    this.meshHoverDetector.update(this.mouse, this.camera.instance)
    // this.model.rotation.y = Math.sin(this.time.elapsed * 0.0012 + 0.25)
  }
}
