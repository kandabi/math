import * as THREE from "three";

const getDistance = (a: number[], b: number[]): number => {
  return Math.sqrt(Math.pow(b[0] - a[0], 2) + Math.pow(b[1] - a[1], 2));
};

// const getNormalizedVector = (a: number, b: number) => {
//   const distance = getDistance(a, b) || 1;
//   return [a / distance, b / distance];
// };

window.onload = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", onWindowResize, false);

  camera.position.z = 6;

  function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function animate() {
    renderer.render(scene, camera);
  }

  function initGrid() {
    const size = 10;
    const divisions = 10;

    const gridHelper = new THREE.GridHelper(size, divisions);
    gridHelper.rotateX(Math.PI / 2);
    scene.add(gridHelper);

    const axesHelper = new THREE.AxesHelper(5);
    scene.add(axesHelper);
  }

  function initLines() {
    // const a = [0, 0];
    // const b = [0, 0];
    // const points = [
    //   new THREE.Vector2(a[0], a[1]),
    //   new THREE.Vector2(b[0], b[1]),
    // ];
    // const geometry = new THREE.BufferGeometry().setFromPoints(points);
    // scene.add(
    //   new THREE.Line(
    //     geometry,
    //     new THREE.LineBasicMaterial({
    //       color: 0x0000ff,
    //     }),
    //   ),
    // );

    // const aToB = [b[0] - a[0], b[1] - a[1]];
    // const normalizedAToB = getNormalizedVector(aToB[0], aToB[1]);

    // const points2 = [
    //   new THREE.Vector2(a[0], a[1]),
    //   new THREE.Vector2(a[0] + normalizedAToB[0], a[1] + normalizedAToB[1]),
    // ];

    // const geometry2 = new THREE.BufferGeometry().setFromPoints(points2);
    // scene.add(
    //   new THREE.Line(
    //     geometry2,
    //     new THREE.LineBasicMaterial({
    //       color: 0xff00ff,
    //     }),
    //   ),
    // );

    const a = [1, 2.72];
    const aMesh = new THREE.Mesh(
      new THREE.CircleGeometry(0.05, 32),
      new THREE.MeshBasicMaterial({
        color: 0x0000ff,
      }),
    );

    aMesh.position.set(a[0], a[1], 0);

    scene.add(aMesh);

    const circleRadius = 2;
    const circleOrigin = [0, 0];

    const distanceCircleToA = getDistance(a, circleOrigin);
    const isInside = distanceCircleToA < circleRadius;

    const circleGeometry = new THREE.CircleGeometry(circleRadius, 32);
    const material = new THREE.MeshBasicMaterial({
      color: isInside ? 0x00ff00 : 0xff0000,
      transparent: true,
      opacity: 0.2,
    });
    const circle = new THREE.Mesh(circleGeometry, material);

    circle.position.set(circleOrigin[0], circleOrigin[1], 0);
    scene.add(circle);
  }

  initGrid();
  initLines();
  renderer.setAnimationLoop(animate);
};
