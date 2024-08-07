<script>
	import { T } from '@threlte/core';
	import { OrbitControls, Grid } from '@threlte/extras';
	import Girl from './models/jp-girl.svelte';
	import NewScene from './NewScene.svelte';
	import { cameraPosition, cameraRotation } from '../stores/cameraStore';
	import { onMount } from 'svelte';

	let currentScene = 'original';
	let originalCamera;
	let newCamera;

	function updateCameraStore(camera) {
		if (camera) {
			cameraPosition.set(camera.position);
			cameraRotation.set(camera.rotation);
		}
	}

	function toggleScene() {
		updateCameraStore(currentScene === 'original' ? originalCamera : newCamera);
		currentScene = currentScene === 'original' ? 'new' : 'original';
	}

	function handleKeydown(event) {
		if (event.key === 'Shift') {
			toggleScene();
		}
	}

	onMount(() => {
		const interval = setInterval(() => {
			updateCameraStore(currentScene === 'original' ? originalCamera : newCamera);
		}, 100);

		return () => {
			clearInterval(interval);
		};
	});
</script>

<svelte:window on:keydown={handleKeydown} />

{#if currentScene === 'original'}
	<T.PerspectiveCamera makeDefault position={[0, 5, 10]} fov={45} bind:ref={originalCamera}>
		<OrbitControls enableDamping />
	</T.PerspectiveCamera>

	<T.DirectionalLight intensity={2} position={[5, 5, 5]} />
	<T.AmbientLight intensity={1} />

	<Grid />

	<Girl />
{:else if currentScene === 'new'}
	<NewScene bind:camera={newCamera} />
{/if}

<!-- Optional: Display current scene name for user feedback -->
<div style="position: absolute; top: 10px; left: 10px; color: white; font-size: 16px; background-color: rgba(0,0,0,0.5); padding: 5px;">
	Current Scene: {currentScene}
</div>