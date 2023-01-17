import * as THREE from 'three'
import OSC from 'osc-js'

import App from '../../App'

import { objectMaterial } from '../../../utils/materials/objectMaterial'
import HUD from '../HUD'
import MeshEventDetector from '../../../utils/MeshEventDetector'

export default class Cube {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.time = this.app.time
    this.debug = this.app.debug
    this.raycaster = this.app.raycaster
    this.camera = this.app.camera
    this.mouse = this.app.mouse

    this.hudElements = this.app.hudElements

    //Debug
    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('cube')
    }

    this.setGeometry()
    this.setMaterial()
    this.setMesh()
    this.setHUD()

    this.setHovering()
    this.meshHoverDetector.on('mouseentermesh', () => this.hover())
    this.meshHoverDetector.on('mouseleavemesh', () => this.leaveHover())
    this.meshHoverDetector.on('mouseclickmesh', () => this.clickEvent())
  }

  setGeometry() {
    this.geometry = new THREE.BoxGeometry(1, 1, 1)
  }

  setMaterial() {
    this.material = objectMaterial()
  }

  setMesh() {
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    this.scene.add(this.mesh)

    this.mesh.castShadow = true
    this.mesh.receiveShadow = true

    this.mesh.position.y += 0.5
    this.mesh.position.x = 1.8
    this.mesh.position.z = -0.53

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

    let message = new OSC.Message('/test', 1)
    this.app.osc.send(message)
  }

  update() {
    this.hud.update()
    this.meshHoverDetector.update()

    // this.mesh.rotation.y = Math.sin(this.time.elapsed * 0.001)
  }
}
