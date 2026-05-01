<!DOCTYPE html>
<html lang="pt-br">
<head>
<meta charset="UTF-8">
<title>fronty</title>

<link rel="manifest" href="manifest.json">
<meta name="theme-color" content="#2ecc71">

<style>
body {
    margin: 0;
    font-family: Arial;
    background: #121212;
    color: white;
}

header {
    background: #1f1f1f;
    padding: 15px;
    display: flex;
    justify-content: space-between;
}

button {
    background: #2ecc71;
    border: none;
    padding: 10px;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

.container {
    padding: 20px;
}

.empty {
    text-align: center;
    margin-top: 50px;
}

#gameScreen {
    display: none;
}
</style>
</head>

<body>

<header>
    <div>🎮 fronty</div>
    <div>
        <button onclick="alert('Configurações em breve')">⚙️</button>
    </div>
</header>

<div id="menuScreen" class="container">

    <div class="empty">
        <p>Nenhum jogo ainda 😢</p>
        <button onclick="startGame()">Entrar</button>
    </div>

</div>

<div id="gameScreen"></div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

<script>

// REGISTRAR PWA
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}

// TROCAR TELA
function startGame(){
    document.getElementById("menuScreen").style.display = "none";
    document.getElementById("gameScreen").style.display = "block";
    initGame();
}

// JOGO 3D
function initGame(){

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.getElementById("gameScreen").appendChild(renderer.domElement);

    // CHÃO
    const ground = new THREE.Mesh(
        new THREE.PlaneGeometry(100, 100),
        new THREE.MeshBasicMaterial({color: 0x228B22})
    );
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // PLAYER
    const player = new THREE.Mesh(
        new THREE.BoxGeometry(1,2,1),
        new THREE.MeshBasicMaterial({color: 0xff0000})
    );
    player.position.y = 1;
    scene.add(player);

    // ÁRVORES
    function createTree(x, z){
        const trunk = new THREE.Mesh(
            new THREE.CylinderGeometry(0.2,0.2,2),
            new THREE.MeshBasicMaterial({color: 0x8B4513})
        );
        trunk.position.set(x,1,z);

        const leaves = new THREE.Mesh(
            new THREE.SphereGeometry(1),
            new THREE.MeshBasicMaterial({color: 0x006400})
        );
        leaves.position.set(x,2.5,z);

        scene.add(trunk);
        scene.add(leaves);
    }

    for(let i=0;i<10;i++){
        createTree(Math.random()*20-10, Math.random()*20-10);
    }

    let mode = 3;

    window.addEventListener("keydown", (e)=>{
        if(e.key === "1") mode = 1;
        if(e.key === "2") mode = 2;
        if(e.key === "3") mode = 3;
    });

    function animate(){
        requestAnimationFrame(animate);

        if(mode === 1){
            camera.position.set(player.position.x, player.position.y + 1, player.position.z);
        }
        if(mode === 2){
            camera.position.set(player.position.x, player.position.y + 3, player.position.z + 3);
        }
        if(mode === 3){
            camera.position.set(player.position.x + 5, player.position.y + 5, player.position.z + 5);
        }

        camera.lookAt(player.position);
        renderer.render(scene, camera);
    }

    animate();
}

</script>

</body>
</html>
