import EventEmitter from './EventEmitter'

export default class MeshEventDetector extends EventEmitter {
  constructor(mesh, raycaster, camera, mouse) {
    super()

    this.mesh = mesh
    this.raycaster = raycaster
    this.camera = camera
    this.mouse = mouse

    console.log(this.camera)

    //Hover event
    this.hovered = false
    this.hoverEventTriggered = false

    //Click event
    this.clicked = false
    this.clickEventTriggered = false
    window.addEventListener('mousedown', (e) => this.onMouseDown(e))
    window.addEventListener('mouseup', (e) => this.onMouseUp(e))
  }

  resetHover() {
    this.hovered = false
    this.hoverEventTriggered = false
  }

  update() {
    // update the raycaster with the current mouse position
    this.raycaster.setFromCamera(this.mouse.mouse, this.camera)

    // check if the ray intersects with the mesh
    const intersects = this.raycaster.intersectObject(this.mesh)
    const hovered = intersects.length > 0

    // update the hovered state if it has changed
    if (hovered !== this.hovered) {
      this.hovered = hovered
      if (hovered && !this.hoverEventTriggered) {
        this.hoverEventTriggered = true
        document.querySelector('body').style.cursor = 'pointer'
        this.trigger('mouseentermesh')
      } else if (!hovered) {
        this.resetHover()
        document.querySelector('body').style.cursor = 'initial'
        this.trigger('mouseleavemesh')
      }
    }
  }

  resetClick() {
    this.clicked = false
    this.clickEventTriggered = false
  }

  onMouseDown(e) {
    // update the raycaster with the current mouse position
    this.raycaster.setFromCamera(this.mouse.mouse, this.camera)

    // check if the ray intersects with the mesh
    const intersects = this.raycaster.intersectObject(this.mesh)
    const clicked = intersects.length > 0

    if (clicked && !this.clickEventTriggered) {
      this.clickEventTriggered = true
      this.clicked = true
    }
  }

  onMouseUp(event) {
    // only trigger the event if the mouse was released while the mesh was clicked
    if (this.clicked) {
      this.resetClick()
      this.trigger('mouseclickmesh')
    }
  }
}
