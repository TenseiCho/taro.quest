import { writable } from 'svelte/store';
import { Vector3, Euler } from 'three';

export const cameraPosition = writable(new Vector3(0, 5, 10));
export const cameraRotation = writable(new Euler());