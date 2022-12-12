import * as THREE from 'three'

import App from '../../App'

export default class Room {
  constructor() {
    this.app = new App()
    this.scene = this.app.scene
    this.debug = this.app.debug

    this.room = new THREE.Group()

    if (this.debug.active) {
      this.debugFolder = this.debug.ui.addFolder('Room')
    }

    this.setGeometry()
    this.setMaterials()
    this.setMeshes()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1)
  }

  setMaterials() {
    this.whiteMaterial = new THREE.MeshStandardMaterial({
      color: 'white',
    })

    this.wallMaterial = new THREE.MeshStandardMaterial({
      color: 'blue',
    })
  }

  setMeshes() {
    this.floor = new THREE.Mesh(this.geometry, this.whiteMaterial)
    this.backWall = new THREE.Mesh(this.geometry, this.wallMaterial)
    this.sideWall = new THREE.Mesh(this.geometry, this.wallMaterial)

    this.room.add(this.floor, this.backWall, this.sideWall)

    this.room.scale.set(10, 10, 10)
    //Floor
    this.floor.rotation.x = -Math.PI / 2

    //Back wall
    this.backWall.position.z = -0.5
    this.backWall.position.y = 0.5

    //Side wall
    this.sideWall.position.x = -0.5
    this.sideWall.position.y = 0.5
    this.sideWall.rotation.y = Math.PI / 2
    this.scene.add(this.room)

    this.room.traverse((wall) => {
      if (wall instanceof THREE.Mesh) {
        wall.receiveShadow = true
      }
    })

    if (this.debug.active) {
      this.debugFolder
        .add(this.room.scale, 'x')
        .name('scale x')
        .min(0)
        .max(20)
        .step(1)
      this.debugFolder
        .add(this.room.scale, 'z')
        .name('scale z')
        .min(0)
        .max(20)
        .step(1)
      this.debugFolder
        .add(this.room.scale, 'y')
        .name('scale y')
        .min(0)
        .max(20)
        .step(1)
    }
  }
}
