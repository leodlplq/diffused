import * as THREE from 'three'
import gsap from 'gsap'

import EventEmitter from '../../utils/EventEmitter'
import App from '../App'

import info from '../../../assets/images/utils/information.svg'

export default class HUD extends EventEmitter {
  constructor(mesh, isOriginCentered) {
    super()

    this.app = new App()
    this.scene = this.app.scene
    this.camera = this.app.camera.instance
    this.sizes = this.app.sizes

    //Options
    this.mesh = mesh
    this.isOriginCentered = isOriginCentered

    //Useful
    this.tempV = new THREE.Vector3()
    this._container = document.querySelector('.labels')
    this.measureMesh = new THREE.Vector3()
    let box3 = new THREE.Box3().setFromObject(mesh)
    box3.getSize(this.measureMesh)

    this.setHTMLElement()
    this.setAnimation()
  }

  setHTMLElement() {
    this.elem = document.createElement('div')
    this.elem.classList.add('click-label')
    this.elem.innerHTML = `
      <img src="${info}" alt="Information">
      <span>Click on mesh to interact</span>
    `
    this._container.appendChild(this.elem)
  }

  setAnimation() {
    console.log('setAnimation')
    this.tl = gsap.timeline({ paused: true })
    this.tl.to(this.elem.querySelector('span'), 0.5, {
      width: 250,
    })
    this.tl.from(this.elem.querySelector('span'), 0.3, {
      opacity: 0,
      x: 10,
    })

    this.elem.addEventListener('mouseenter', () => {
      console.log('enter')
      this.tl.play()
    })

    this.elem.addEventListener('mouseleave', () => {
      console.log('leave')
      this.tl.reverse()
    })
  }

  update() {
    // get the position of the center of the cube
    // this.mesh.updateWorldMatrix(true, false)
    this.mesh.getWorldPosition(this.tempV)

    if (this.isOriginCentered) {
      //rajouter taille complete
      this.tempV.y += this.measureMesh.y * 0.5
    } else {
      //rajouter moité taille
      this.tempV.y += this.measureMesh.y
    }

    this.tempV.x += this.measureMesh.x * 0.5

    // get the normalized screen coordinate of that position
    // x and y will be in the -1 to +1 range with x = -1 being
    // on the left and y = -1 being on the bottom
    this.tempV.project(this.camera)

    // convert the normalized position to CSS coordinates
    const x = (this.tempV.x * 0.5 + 0.5) * this.sizes.width
    const y = (this.tempV.y * -0.5 + 0.5) * this.sizes.height

    // move the elem to that position
    this.elem.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`
  }

  destroy() {
    gsap.to(this.elem, { opacity: 0, duration: 0.5 })
    setTimeout(() => {
      this.elem.style.display = 'none'
    }, 500)
  }
}
