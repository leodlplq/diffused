import * as THREE from 'three'
import { objectMaterial } from '../../../utils/materials/objectMaterial'

import App from '../../App'
import HUD from '../HUD'
import MeshEventDetector from '../../../utils/MeshEventDetector'
import EventEmitter from '../../../utils/EventEmitter'

export default class Stump extends EventEmitter {
  constructor() {
    super()

    this.app = new App()
    this.scene = this.app.scene
    this.resources = this.app.resources
    this.time = this.app.time

    this.raycaster = this.app.raycaster
    this.camera = this.app.camera
    this.mouse = this.app.mouse

    this.hudElements = this.app.hudElements

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
    this.meshHoverDetector.on('mouseentermesh', () => this.hover())
    this.meshHoverDetector.on('mouseleavemesh', () => this.leaveHover())
    this.meshHoverDetector.on('mouseclickmesh', () => this.clickEvent())
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
    this.meshHoverDetector = new MeshEventDetector(
      this.model.children[0],
      this.raycaster,
      this.camera.instance,
      this.mouse,
    )
  }

  hover() {
    console.log('hover')
    this.hudElements.circle.classList.add('hovered')
  }

  leaveHover() {
    console.log('leave hover')
    this.hudElements.circle.classList.remove('hovered')
  }

  clickEvent() {
    this.hudElements.circle.classList.remove('clicked') // reset animation
    void this.hudElements.circle.offsetWidth // trigger reflow
    this.hudElements.circle.classList.add('clicked') // start animation
  }

  update() {
    this.hud.update()
    this.meshHoverDetector.update()
    // this.model.rotation.y = Math.sin(this.time.elapsed * 0.0012 + 0.25)
  }
}
