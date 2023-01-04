export default class Mouse {
  constructor() {
    this.mouse = { x: 0, y: 0 }

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = (e.clientX / window.innerWidth) * 2 - 1
      this.mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
    })
  }
}
