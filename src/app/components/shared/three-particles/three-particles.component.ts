import { Component, ElementRef, OnInit, OnDestroy } from '@angular/core';
import * as THREE from 'three';

@Component({
  selector: 'app-particles',
  templateUrl: './three-particles.component.html',
  styleUrls: ['./three-particles.component.css'],
})
export class ThreeParticulesComponent implements OnInit, OnDestroy {
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private particles!: THREE.Points;
  private particlePositions: THREE.Vector3[] = [];
  private targetPositions: THREE.Vector3[] = [];
  private particleCount = 5000; // Number of particles
  private animationFrameId!: number;
  private clock = new THREE.Clock();

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.initThree();
    this.createDisorderedParticles();
    this.animateParticlesToFormText('INVEST BUDDY');
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
    this.renderer.dispose();
  }

  private initThree(): void {
    const container = this.elementRef.nativeElement.querySelector('.particles-container');

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#001a33'); // Modern deep blue background

    const aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    this.camera.position.z = 60;

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(this.renderer.domElement);

    window.addEventListener('resize', () => {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    });
  }

  private createDisorderedParticles(): void {
    const particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(this.particleCount * 3);

    for (let i = 0; i < this.particleCount; i++) {
      const x = (Math.random() - 0.5) * 200; // Random x position
      const y = (Math.random() - 0.5) * 200; // Random y position
      const z = (Math.random() - 0.5) * 50; // Random z position
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;
      this.particlePositions.push(new THREE.Vector3(x, y, z)); // Store initial positions
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.3, // Small circular particles
      color: 0x87ceeb, // Sky blue color
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending, // Glow effect
      depthWrite: false,
    });

    this.particles = new THREE.Points(particlesGeometry, particlesMaterial);
    this.scene.add(this.particles);
  }

  private animateParticlesToFormText(text: string): void {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d')!;
    canvas.width = 1000;
    canvas.height = 200;
    context.font = 'bold 150px Arial';
    context.fillStyle = '#ffffff'; // White text
    context.fillText(text, 100, 150);

    // Get pixel data from the canvas
    const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    const width = imageData.width;
    const height = imageData.height;
    const pixelData = imageData.data;

    // Convert pixel positions into 3D positions
    this.targetPositions = [];
    for (let y = 0; y < height; y += 5) {
      for (let x = 0; x < width; x += 5) {
        const pixelIndex = (y * width + x) * 4;
        if (pixelData[pixelIndex + 3] > 128) {
          const posX = (x - width / 2) * 0.1;
          const posY = -(y - height / 2) * 0.1;
          this.targetPositions.push(new THREE.Vector3(posX, posY, 0));
        }
      }
    }

    this.animate();
  }

  private animate(): void {
    this.animationFrameId = requestAnimationFrame(() => this.animate());

    const positions = this.particles.geometry.attributes['position'].array as Float32Array;

    // Move particles toward target positions
    for (let i = 0; i < this.particleCount; i++) {
      if (i < this.targetPositions.length) {
        const target = this.targetPositions[i];
        const current = this.particlePositions[i];
        current.lerp(target, 0.03); // Smooth transition to target

        positions[i * 3] = current.x;
        positions[i * 3 + 1] = current.y;
        positions[i * 3 + 2] = current.z;
      } else {
        // Move extra particles out of view
        positions[i * 3] += (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 1] += (Math.random() - 0.5) * 0.5;
        positions[i * 3 + 2] = 200; // Move them far away
      }
    }

    this.particles.geometry.attributes['position'].needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }
}
