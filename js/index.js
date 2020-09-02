window.addEventListener("load", init);

function init() {

  // 幅と高さを取得
  const width = window.innerWidth;
  const height = window.innerHeight;
  // それぞれの雲を格納する配列を作成
  const cloudParticles = [];

  // シーンを作成
  const scene = new THREE.Scene();

  // レンダラーを作成
  const renderer = new THREE.WebGLRenderer();
  scene.fog = new THREE.FogExp2(0x11111f, 0.002);
  renderer.setClearColor(scene.fog.color);
  document.body.appendChild(renderer.domElement);

  // カメラを作成
  const camera = new THREE.PerspectiveCamera(60, width / height, 1, 1000);
  camera.position.z = 1;
  camera.rotation.x = 1.16;
  camera.rotation.y = -0.12;
  camera.rotation.z = 0.27;

  // 環境光源を作成
  const ambient = new THREE.AmbientLight(0x555555);
  scene.add(ambient);

  // 平行光源を作成
  const directional = new THREE.DirectionalLight(0xffeedd);
  directional.position.set(0,0,1);
  scene.add(directional);

  // 点光源を作成
  const point = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
  point.position.set(200,300,100);
  scene.add(point);

  // 雲を作成
  const loader = new THREE.TextureLoader();
  loader.load("https://i.postimg.cc/TYvjnH2F/smoke-1.png", function(texture){
    //　ジオメトリを作成
    const cloudGeometry = new THREE.PlaneBufferGeometry(500,500);
    // マテリアルを作成
    const cloudMaterial = new THREE.MeshLambertMaterial({
      map: texture,
      transparent: true
    });
    for(let i = 0; i < 25; i++) {
      // メッシュを作成
      const cloud = new THREE.Mesh(cloudGeometry,cloudMaterial);
      cloud.position.set(
          Math.random() * 800 - 400,
          500,
          Math.random() * 500 - 450
      );
      cloud.rotation.x = 1.16;
      cloud.rotation.y = -0.12;
      cloud.rotation.z = Math.random() * 360;
      cloud.material.opacity = 0.6;
      cloudParticles.push(cloud);
      scene.add(cloud);
    }
  });

  // 雨を作成
  // ジオメトリを作成
  const rainGeometry = new THREE.Geometry();
  // 雨粒の数を指定
  const rainCount = 15000;
  for(let i = 0;i < rainCount; i++) {
    rainDrop = new THREE.Vector3(
        Math.random() * 400 - 200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
    );
    rainDrop.velocity = {};
    rainDrop.velocity = 0;
    rainGeometry.vertices.push(rainDrop);
  }
  // マテリアルを作成
  const rainMaterial = new THREE.PointsMaterial({
    color: 0xaaaaaa,
    size: 0.1,
    transparent: true
  });
  // ポイント(雨)を作成
  const rain = new THREE.Points(rainGeometry,rainMaterial);
  scene.add(rain);

  function render() {
    cloudParticles.forEach(i => {
      i.rotation.z -= 0.002;
    });
    rainGeometry.vertices.forEach(i => {
      i.velocity -= 0.1 + Math.random() * 0.1;
      i.y += i.velocity;
      if (i.y < -200) {
        i.y = 200;
        i.velocity = 0;
      }
    });
    rainGeometry.verticesNeedUpdate = true;
    rain.rotation.y += 0.002;
    if(Math.random() > 0.93 || point.power > 100) {
      if(point.power < 100)
        point.position.set(
            Math.random() * 400,
            300 + Math.random() *200,
            100
        );
      point.power = 50 + Math.random() * 500;
    }
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  render();

  window.addEventListener("resize", onResize);

  // リサイズ処理
  function onResize() {
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  onResize();
}