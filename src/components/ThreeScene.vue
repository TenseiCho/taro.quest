<!-- ThreeScene.vue -->
<template>
    <div ref="sceneContainer"></div>
  </template>
  
  <script>
  import { ref, onMounted, onUnmounted } from 'vue';
  import * as THREE from 'three';
  
  export default {
    name: 'ThreeScene',
    setup() {
      const sceneContainer = ref(null);
      let scene, camera, renderer, cube;
  
      const initThree = () => {
        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        sceneContainer.value.appendChild(renderer.domElement);
  
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
  
        camera.position.z = 5;
      };
  
      const animate = () => {
        requestAnimationFrame(animate);
  
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
  
        renderer.render(scene, camera);
      };
  
      const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
  
      onMounted(() => {
        initThree();
        animate();
        window.addEventListener('resize', handleResize);
      });
  
      onUnmounted(() => {
        window.removeEventListener('resize', handleResize);
        // Clean up Three.js resources
        scene.remove(cube);
        geometry.dispose();
        material.dispose();
        renderer.dispose();
      });
  
      return { sceneContainer };
    }
  };
  </script>
  
  <style scoped>
  div {
    width: 100%;
    height: 100vh;
  }
  </style>