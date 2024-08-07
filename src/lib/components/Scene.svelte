<script>
	import { T } from '@threlte/core';
	import { OrbitControls, Grid, Text } from '@threlte/extras';
	import Girl from './models/jp-girl.svelte';
	import NewScene from './NewScene.svelte';

	let currentScene = 'original';
	function toggleScene() {
		currentScene = currentScene === 'original' ? 'new' : 'original';
	}

	function handleKeydown(event) {
		if (event.key === 'Shift') {
			toggleScene();
		}
	}
</script>

<svelte:window on:keydown={handleKeydown} />

{#if currentScene === 'original'}
	<T.PerspectiveCamera makeDefault position={[0, 5, 10]} fov={45}>
		<OrbitControls enableDamping />
	</T.PerspectiveCamera>

	<T.DirectionalLight intensity={2} position={[5, 5, 5]} />
	<T.AmbientLight intensity={1} />

	<Grid />

	<Girl />
{:else if currentScene === 'new'}
	<NewScene />
{/if}

<!-- Scene indicator text -->
<Text
	position={[0, 2, 0]}
	scale={0.5}
	color="white"
	anchorX="center"
	anchorY="middle"
	renderOrder={1}
	castShadow
	receiveShadow={false}
>
	Current Scene: {currentScene === 'original' ? 'Original' : 'New'}
</Text>

<!-- Instructions for scene switching -->
<Text
	position={[0, -2, 0]}
	scale={0.3}
	color="white"
	anchorX="center"
	anchorY="middle"
	renderOrder={1}
	castShadow
	receiveShadow={false}
>
	Press SHIFT to switch scenes
</Text>