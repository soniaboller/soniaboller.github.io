var controls, camera, scene, renderer;
var cameraCube, sceneCube;
var textureEquirec, textureSphere;
var cubeMesh, sphereMesh, sphereMesh2;
var sphereMaterial;
var ianTexture, soniaTexture, ian, sonia;
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
    textureSphere = textureLoader.load( "textures/metal.jpg" );
    textureSphere.mapping = THREE.SphericalReflectionMapping;

    ianTexture = textureLoader.load( "textures/ian1.png" );
    soniaTexture = textureLoader.load( "textures/sonia1.png" );

    var ianMaterial = new THREE.PointsMaterial({ size: 150, map: ianTexture, depthTest: false, transparent : false });
    var soniaMaterial = new THREE.PointsMaterial({ size: 150, map: soniaTexture, blending: THREE.AdditiveBlending, depthTest: false, transparent : true});
    var ianGeometry = new THREE.Geometry();
    var ianVertex = new THREE.Vector3();
    ianVertex.x = -500;
    ianVertex.y = 100;
    ianVertex.z = 1;
    ianGeometry.vertices.push(ianVertex);

    var soniaGeometry = new THREE.Geometry();
    var soniaVertex = new THREE.Vector3();
    soniaVertex.x = 500;
    soniaVertex.y = 100;
    soniaVertex.z = 1;
    soniaGeometry.vertices.push(soniaVertex);

    ian = new THREE.Points (ianGeometry, ianMaterial);
    sonia = new THREE.Points (soniaGeometry, soniaMaterial);

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
    cubeMesh = new THREE.Mesh( new THREE.BoxGeometry( 100, 100, 100 ), equirectMaterial );
    sceneCube.add( cubeMesh );
    //
    var geometry = new THREE.SphereGeometry( 200.0, 24, 24 );
    sphereMaterial = new THREE.MeshLambertMaterial( { envMap: textureEquirec } );
    sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
    sphereMesh.position.x = -500;
    sphereMesh.position.y = -100;
    sphereMesh2 = new THREE.Mesh( geometry, sphereMaterial );
    sphereMesh2.position.x = 500;
    sphereMesh2.position.y = -100;
    scene.add( sphereMesh );
    scene.add( sphereMesh2 );

    scene.add(ian);
    scene.add(sonia);

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