<script lang="ts">
  import { Canvas } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import { SphereGeometry, MeshStandardMaterial } from 'three'

  const geometry = new SphereGeometry(1, 32, 32)
  const material = new MeshStandardMaterial({ color: 0x00ff00 })
</script>

<style>
    :global(canvas) {
      width: 100%;
      height: 300px;
    }
</style>

<Canvas>
  <OrbitControls />
  <ambientLight intensity={0.5} />
  <directionalLight position={[10, 10, 10]} intensity={1} />
  <mesh>
    <sphereGeometry args={[1, 32, 32]} />
    <meshStandardMaterial color={0x00ff00} />
  </mesh>
</Canvas>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>