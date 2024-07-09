<script lang="ts">
  import { T } from '@threlte/core'
  import { ContactShadows, Float, Grid, OrbitControls, useGltf } from '@threlte/extras'

  const gltf = useGltf('/zeze_3d_anime_girl.glb')

  let orbitControlsRef: OrbitControls

  function setView(x: number, y: number, z: number) {
    if (orbitControlsRef) {
      orbitControlsRef.object.position.set(x, y, z)
      orbitControlsRef.target.set(0, 0, 0)
      orbitControlsRef.update()
    }
  }

  function handleKeydown(event: KeyboardEvent) {
    switch(event.key) {
      case 'Numpad1': setView(0, 0, 7); break;  // Front view
      case 'Numpad3': setView(7, 0, 0); break;  // Right view
      case 'Numpad7': setView(0, 7, 0); break;  // Top view
      case 'Numpad5': orbitControlsRef?.togglePerspective(); break;  // Toggle perspective/orthographic
    }
  }
</script>

<svelte:window on:keydown={handleKeydown} />

<T.PerspectiveCamera
  makeDefault
  position={[7, 7, 7]}
  fov={35}
>
  <OrbitControls
    bind:this={orbitControlsRef}
    enableDamping
    dampingFactor={0.05}
    screenSpacePanning={true}
    minDistance={1}
    maxDistance={1000}
    maxPolarAngle={Math.PI / 2 - 0.1}
    keys={{
      LEFT: 'ArrowLeft', 
      UP: 'ArrowUp', 
      RIGHT: 'ArrowRight', 
      BOTTOM: 'ArrowDown'
    }}
    mouseButtons={{
      LEFT: 1,
      MIDDLE: 2,
      RIGHT: 3
    }}
    touches={{
      ONE: 0,
      TWO: 2
    }}
  />
</T.PerspectiveCamera>

<T.DirectionalLight
  intensity={0.8}
  position.x={5}
  position.y={10}
/>
<T.AmbientLight intensity={0.2} />

<Grid
  position.y={-0.001}
  cellColor="#ffffff"
  sectionColor="#ffffff"
  sectionThickness={0}
  fadeDistance={25}
  cellSize={2}
/>

<ContactShadows
  scale={10}
  blur={2}
  far={2.5}
  opacity={0.5}
/>

{#await gltf}
  <!-- Optional: Show loading state -->
{:then model}
  {console.log('Model loaded:', model)}
  <T.Group scale={0.5} position.y={1}>
    <T.Primitive object={model.scene} />
  </T.Group>
{:catch error}
  {console.error('Error loading model:', error)}
{/await}