<template>
  <div>
    <canvas ref="sceneContainer"></canvas>
    <pre ref="asciiContainer">{{ asciiSphere }}</pre>
    <div class="debug-info">
      Canvas size: {{ canvasSize.width }} x {{ canvasSize.height }}<br />
      ASCII size: {{ asciiSize.width }} x {{ asciiSize.height }}<br />
      FPS: {{ fps }}
    </div>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import * as THREE from 'three'

export default {
  name: 'ThreeScene',
  setup() {
    const sceneContainer = ref(null)
    const asciiContainer = ref(null)
    const asciiSphere = ref('Loading...')
    const canvasSize = reactive({ width: 0, height: 0 })
    const asciiSize = reactive({ width: 80, height: 40 })
    const fps = ref(0)
    let scene, camera, renderer, sphere
    let lastTime = 0

    const initThree = () => {
      scene = new THREE.Scene()
      camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
      camera.position.z = 5
      renderer = new THREE.WebGLRenderer({ canvas: sceneContainer.value, antialias: true })
      renderer.setSize(window.innerWidth, window.innerHeight)
      renderer.setClearColor(0xffffff, 1)
      scene.add(new THREE.AmbientLight(0xffffff, 0.5))
      const light = new THREE.DirectionalLight(0xffffff, 1)
      light.position.set(5, 5, 5)
      scene.add(light)
      sphere = new THREE.Mesh(
        new THREE.SphereGeometry(1, 32, 32),
        new THREE.MeshPhongMaterial({ color: 0xff0000 })
      )
      scene.add(sphere)
      canvasSize.width = window.innerWidth
      canvasSize.height = window.innerHeight
    }

    const animate = (time) => {
      requestAnimationFrame(animate)
      sphere.rotation.x += 0.01
      sphere.rotation.y += 0.01
      renderer.render(scene, camera)
      updateASCIISphere()

      // Calculate FPS
      if (lastTime) {
        fps.value = Math.round(1000 / (time - lastTime))
      }
      lastTime = time
    }

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
      canvasSize.width = window.innerWidth
      canvasSize.height = window.innerHeight
    }

    const updateASCIISphere = () => {
      const width = asciiSize.width
      const height = asciiSize.height
      const asciiChars = ' .:-=+*#%@'

      const tempRenderer = new THREE.WebGLRenderer({ antialias: false })
      tempRenderer.setSize(width, height)
      tempRenderer.render(scene, camera)

      const pixelData = new Uint8Array(width * height * 4)
      tempRenderer.readRenderTargetPixels(
        tempRenderer.getRenderTarget(),
        0,
        0,
        width,
        height,
        pixelData
      )

      let asciiOutput = ''
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          const pixelIndex = (y * width + x) * 4
          const intensity =
            (pixelData[pixelIndex] + pixelData[pixelIndex + 1] + pixelData[pixelIndex + 2]) / 3
          const asciiIndex = Math.floor(intensity / 25.6)
          asciiOutput += asciiChars[asciiIndex]
        }
        asciiOutput += '\n'
      }

      asciiSphere.value = asciiOutput
      tempRenderer.dispose()
    }

    onMounted(() => {
      initThree()
      animate()
      window.addEventListener('resize', handleResize)
    })

    onUnmounted(() => {
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      scene.dispose()
    })

    return { sceneContainer, asciiContainer, asciiSphere, canvasSize, asciiSize, fps }
  }
}
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100vh;
}
pre {
  position: absolute;
  top: 10px;
  left: 10px;
  font-family: monospace;
  font-size: 8px;
  line-height: 8px;
  color: black;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
}
.debug-info {
  position: absolute;
  bottom: 10px;
  left: 10px;
  font-family: monospace;
  font-size: 12px;
  color: black;
  background-color: rgba(255, 255, 255, 0.7);
  padding: 10px;
  border-radius: 5px;
}
</style>
