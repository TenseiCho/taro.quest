<template>
  <canvas ref="sceneContainer"></canvas>
  <pre>{{ asciiSphere }}</pre>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

export default {
  name: 'ThreeScene',
  setup() {
    const sceneContainer = ref(null)
    const asciiSphere = ref('')
    let scene, camera, renderer, sphere

    const initThree = () => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5
      renderer = new THREE.WebGLRenderer({ canvas: sceneContainer.value })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xffffff, 1)
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(5, 5, 5)
      scene.add(light)
      sphere = new THREE.Mesh(new THREE.SphereGeometry(1, 32, 32), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
      scene.add(sphere)
    }

    const animate = () => {
      requestAnimationFrame(animate)
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
      renderer.render(scene, camera)
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    const createASCIISphere = (radius, resolution) => {
      const width = 80
      const height = 40
      const chars = '.:-=+*#%@'
      const tempScene = new THREE.Scene()
      const tempCamera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
      tempCamera.position.z = 5
      const geometry = new THREE.SphereGeometry(radius, resolution, resolution)
      const material = new THREE.MeshBasicMaterial()
      const tempSphere = new THREE.Mesh(geometry, material)
      tempScene.add(tempSphere)

      const asciiSphereLines = []
      for (let y = 0; y < height; y++) {
        let row = ''
        for (let x = 0; x < width; x++) {
          const vector = new THREE.Vector3((x / width) * 2 - 1, -(y / height) * 2 + 1, 0.5)
          vector.unproject(tempCamera)
          const ray = new THREE.Raycaster(tempCamera.position, vector.sub(tempCamera.position).normalize())
          const intersects = ray.intersectObject(tempSphere)
          if (intersects.length > 0) {
            const intersectionPoint = intersects[0].point
            const distance = intersectionPoint.distanceTo(tempCamera.position)
            const index = Math.floor(((radius - distance) / radius) * chars.length)
            row += chars[Math.max(0, Math.min(chars.length - 1, index))]
          } else {
            row += ' '
          }
        }
        asciiSphereLines.push(row)
      }
      return asciiSphereLines.join('\n')
    }

    onMounted(() => {
      initThree()
      animate()
      window.addEventListener('resize', handleResize)
      asciiSphere.value = createASCIISphere(2, 32)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
    })

    return { sceneContainer, asciiSphere }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
}
pre {
  font-family: monospace;
  font-size: 8px;
  line-height: 8px;
}
</style>