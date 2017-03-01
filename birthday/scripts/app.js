var controls, camera, scene, renderer;
var cameraCube, sceneCube;
var textureEquirec, textureSphere;
var cubeMesh, sphereMesh;
var sphereMaterial;
init();
animate();
function init() {
    // CAMERAS
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
    camera.position.set( 0, 0, 1000 );
    cameraCube = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 100000 );
    controls = new THREE.OrbitControls( camera );
    controls.minDistance = 500;
    controls.maxDistance = 2500;
    // SCENE
    scene = new THREE.Scene();
    sceneCube = new THREE.Scene();
    // Lights
    var ambient = new THREE.AmbientLight( 0xffffff );
    scene.add( ambient );
    // Textures
    var textureLoader = new THREE.TextureLoader();
    textureEquirec = textureLoader.load( "textures/sikkim.jpg" );
    textureEquirec.mapping = THREE.EquirectangularReflectionMapping;
    textureEquirec.magFilter = THREE.LinearFilter;
    textureEquirec.minFilter = THREE.LinearMipMapLinearFilter;
    textureSphere = textureLoader.load( "textures/photo.jpg" );
    textureSphere.mapping = THREE.SphericalReflectionMapping;
    // Materials

    var equirectShader = THREE.ShaderLib[ "equirect" ];
    var equirectMaterial = new THREE.ShaderMaterial( {
        fragmentShader: equirectShader.fragmentShader,
        vertexShader: equirectShader.vertexShader,
        uniforms: equirectShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    } );
    equirectMaterial.uniforms[ "tEquirect" ].value = textureEquirec;
    var cubeShader = THREE.ShaderLib[ "cube" ];
    var cubeMaterial = new THREE.ShaderMaterial( {
        fragmentShader: cubeShader.fragmentShader,
        vertexShader: cubeShader.vertexShader,
        uniforms: cubeShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    } );
    cubeMaterial.uniforms[ "tCube" ].value = textureEquirec;
    // Skybox
    cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), equirectMaterial );
    sceneCube.add( cubeMesh );
    //
    var geometry = new THREE.SphereGeometry( 400.0, 24, 24 );
    sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureEquirec } );
    sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
    scene.add( sphereMesh );

    cubeMesh.visible = true;
    sphereMaterial.needsUpdate = true;
    //
    renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setFaceCulling( THREE.CullFaceNone );
    document.body.appendChild( renderer.domElement );
    //
}
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    cameraCube.aspect = window.innerWidth / window.innerHeight;
    cameraCube.updateProjectionMatrix();
    renderer.setSize( window.innerWidth, window.innerHeight );
}
//
function animate() {
    requestAnimationFrame( animate );
    render();
    controls.update();
}
function render() {
    var timer = -0.0002 * Date.now();
    camera.lookAt( scene.position );
    cameraCube.rotation.copy( camera.rotation );
    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );
}