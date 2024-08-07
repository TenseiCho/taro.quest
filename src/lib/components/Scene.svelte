<script>
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import Girl from './models/jp-girl.svelte';
</script>

<T.PerspectiveCamera makeDefault position={[0, 5, 10]} fov={45}>
	<OrbitControls enableDamping />
</T.PerspectiveCamera>

<T.DirectionalLight intensity={2} position={[5, 5, 5]} />
<T.AmbientLight intensity={1} />


<Grid />

<Girl />