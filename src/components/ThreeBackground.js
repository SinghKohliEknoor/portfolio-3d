import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

const ThreeBackground = ({ initials = "ESK" }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    let renderer,
      scene,
      camera,
      frameId,
      monogram,
      particles,
      time = 0;
    const aim = { x: 0, y: 0 };

    const onPointerMove = (e) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      aim.x = x * 0.6;
      aim.y = -y * 0.4;
    };
    const onResize = () => {
      if (!renderer || !camera) return;
      const w = window.innerWidth,
        h = window.innerHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };

    (async () => {
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));
        renderer.setSize(window.innerWidth, window.innerHeight);
        if (THREE.SRGBColorSpace)
          renderer.outputColorSpace = THREE.SRGBColorSpace;
        mountEl.appendChild(renderer.domElement);

        scene = new THREE.Scene();
        camera = new THREE.PerspectiveCamera(
          32,
          window.innerWidth / window.innerHeight,
          0.1,
          300
        );
        camera.position.set(0, 1.6, 36);

        const amb = new THREE.AmbientLight(0xffffff, 0.55);
        const dir = new THREE.DirectionalLight(0xffffff, 0.8);
        dir.position.set(-4, 2, -2);
        const spot = new THREE.SpotLight(0xffffff, 1.6, 30, Math.PI / 4, 0.6);
        spot.position.set(5, 8, 3);
        scene.add(amb, dir, spot);

        const loader = new FontLoader();
        const font = await new Promise((resolve, reject) =>
          loader.load(
            "/fonts/helvetiker_bold.typeface.json",
            resolve,
            undefined,
            reject
          )
        );

        const textGeo = new TextGeometry(initials, {
          font,
          size: 5.5,
          height: 0.35,
          curveSegments: 12,
          bevelEnabled: true,
          bevelThickness: 0.08,
          bevelSize: 0.06,
          bevelOffset: 0,
          bevelSegments: 3,
        });
        textGeo.computeBoundingBox();
        textGeo.center();

        const mat = new THREE.MeshPhysicalMaterial({
          color: 0xb9c5ff,
          metalness: 0.35,
          roughness: 0.55,
          clearcoat: 0.6,
          clearcoatRoughness: 0.25,
          side: THREE.FrontSide,
          transparent: true,
          opacity: 0.9,
        });
        monogram = new THREE.Mesh(textGeo, mat);
        monogram.position.set(0, 0, -24);
        monogram.rotation.set(0, 0.08, 0);
        monogram.scale.set(2, 2, 0.04);
        scene.add(monogram);

        const count = 1200,
          radius = 24;
        const positions = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
          const v = new THREE.Vector3()
            .randomDirection()
            .multiplyScalar(radius * (0.6 + Math.random() * 0.4));
          positions.set([v.x, v.y, v.z], i * 3);
        }
        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
        const pMat = new THREE.PointsMaterial({
          size: 0.02,
          transparent: true,
          opacity: 0.85,
          sizeAttenuation: true,
          color: 0xffffff,
        });
        particles = new THREE.Points(pGeo, pMat);
        scene.add(particles);

        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("resize", onResize);

        const animate = () => {
          time += 0.016;
          const target = new THREE.Vector3(
            6 * Math.sin(time * 0.16 + aim.x),
            1.8 + aim.y * 0.6,
            32 + 3 * Math.cos(time * 0.16)
          );
          camera.position.lerp(target, 0.05);
          camera.lookAt(0, 0, 0);
          monogram.rotation.y += 0.08 * 0.016;
          monogram.rotation.x += 0.03 * 0.016;
          particles.rotation.y += 0.03 * 0.016;
          particles.rotation.x += 0.01 * 0.016;
          renderer.render(scene, camera);
          frameId = requestAnimationFrame(animate);
        };
        onResize();
        frameId = requestAnimationFrame(animate);
      } catch (err) {
        console.error(err);
      }
    })();

    return () => {
      try {
        if (frameId) cancelAnimationFrame(frameId);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("pointermove", onPointerMove);
        if (mountEl && mountEl.firstChild) {
          mountEl.removeChild(mountEl.firstChild);
        }
      } catch (err) {}
    };
  }, [initials]);

  return <div ref={mountRef} className="canvas-mount" />;
};

export default ThreeBackground;
