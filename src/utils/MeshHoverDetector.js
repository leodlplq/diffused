import EventEmitter from './EventEmitter'

export default class MeshHoverDetector extends EventEmitter {
  constructor(mesh, raycaster) {
    super()

    this.mesh = mesh
    this.raycaster = raycaster
    this.hovered = false
    this.eventTriggered = false
  }

  reset() {
    this.hovered = false
    this.eventTriggered = false
  }

  update(mouse, camera) {
    // update the raycaster with the current mouse position
    this.raycaster.setFromCamera(mouse.mouse, camera)

    // check if the ray intersects with the mesh
    const intersects = this.raycaster.intersectObject(this.mesh)
    const hovered = intersects.length > 0

    // update the hovered state if it has changed
    if (hovered !== this.hovered) {
      this.hovered = hovered
      if (hovered && !this.eventTriggered) {
        this.eventTriggered = true
        this.trigger('mouseentermesh', this.mesh)
        this.mesh.material.emissive.setHex(0xff0000)
      } else if (!hovered) {
        this.reset()
        this.trigger('mouseleavemesh')
        this.mesh.material.emissive.setHex(0x000000)
      }
    }
  }
}
