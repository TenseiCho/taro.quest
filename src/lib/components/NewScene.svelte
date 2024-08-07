<script>
  import { T } from '@threlte/core';
  import { OrbitControls, Grid } from '@threlte/extras';
  import { cameraPosition, cameraRotation } from '../stores/cameraStore';
  import { onMount } from 'svelte';

  export let camera;

  let initialPosition;
  let initialRotation;

  onMount(() => {
    const unsubPosition = cameraPosition.subscribe(value => {
      initialPosition = value;
    });
    const unsubRotation = cameraRotation.subscribe(value => {
      initialRotation = value;
    });

    return () => {
      unsubPosition();
      unsubRotation();
    };
  });
</script>

<T.PerspectiveCamera 
  makeDefault 
  position={initialPosition || [0, 5, 10]} 
  rotation={initialRotation}
  fov={45}
  bind:ref={camera}
>
  <OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={2} position={[5, 5, 5]} />
<T.AmbientLight intensity={1} />

<Grid />