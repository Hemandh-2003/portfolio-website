import * as THREE from 'three';
document.addEventListener("DOMContentLoaded", () => {
    const elements = document.querySelectorAll(".fade-up");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    elements.forEach(el => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", function () {

    const container = document.getElementById("globe-container");
    if (!container) return;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x111111);


    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(2, 64, 64);

   const material = new THREE.MeshBasicMaterial({
    color: 0x3b82f6,
    wireframe: true
});


    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    camera.position.z = 5;

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y += 0.003;
        renderer.render(scene, camera);
    }

    animate();

});

document.addEventListener("DOMContentLoaded", function () {

    const hero = document.querySelector(".hero");
    const glow = document.querySelector(".mouse-glow");

    if (!hero || !glow) return;

    hero.addEventListener("mousemove", (e) => {
        const rect = hero.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        glow.style.left = x + "px";
        glow.style.top = y + "px";
    });

});
