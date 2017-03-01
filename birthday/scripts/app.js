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
    // var dirLight = new THREE.DirectionalLight( 0xff0000, 0.5 );
    // dirLight.position.set( 0, 1, 0 ).normalize();
    // scene.add( dirLight );

    var pointLight = new THREE.PointLight( 0x0000ff, 10, 400 );
    pointLight.position.set( 0, 300, 100 );
    scene.add( pointLight );

    var pointLight2 = new THREE.PointLight( 0xff0000, 10, 400 );
    pointLight2.position.set( 0, 300, -100 );
    scene.add( pointLight2 );


    var pointLight3 = new THREE.PointLight( 0x00ff00, 10, 400 );
    pointLight3.position.set( 0, -10, 0 );
    scene.add( pointLight3 );

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

    // var ianMaterial = new THREE.SpriteMaterial({ size: 150, map: ianTexture, blending: THREE.AdditiveBlending, depthTest: false, transparent : true });
    // var soniaMaterial = new THREE.SpriteMaterial({ size: 150, map: soniaTexture, blending: THREE.AdditiveBlending, depthTest: false, transparent : true});

    var ianMaterial = new THREE.SpriteMaterial({map:ianTexture, color:0xffffff});
    var soniaMaterial = new THREE.SpriteMaterial({map:soniaTexture, color:0xffffff});

    // var ianGeometry = new THREE.Geometry();
    // var ianVertex = new THREE.Vector3();
    // ianVertex.x = -500;
    // ianVertex.y = 100;
    // ianVertex.z = 1;
    // ianGeometry.vertices.push(ianVertex);
    //
    // var soniaGeometry = new THREE.Geometry();
    // var soniaVertex = new THREE.Vector3();
    // soniaVertex.x = 500;
    // soniaVertex.y = 100;
    // soniaVertex.z = 1;
    // soniaGeometry.vertices.push(soniaVertex);

    // ian = new THREE.Points (ianGeometry, ianMaterial);
    // sonia = new THREE.Points (soniaGeometry, soniaMaterial);

    ian = new THREE.Sprite( ianMaterial );
    ian.scale.set(150, 200, 0)
    ian.position.set(500,200,1)
    sonia = new THREE.Sprite( soniaMaterial );
    sonia.scale.set(150, 200, 0)
    sonia.position.set(-500,200,1)

    // Materials


    var loader = new THREE.FontLoader();

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        var textGeo = new THREE.TextGeometry( "HAPPY BIRTHDAY", {

            font: font,

            size: 50,
            height: 50,
            curveSegments: 12,

            bevelThickness: 1,
            bevelSize: 1,
            bevelEnabled: true

        } );

        var textMaterial = new THREE.MeshPhongMaterial( { color: 0x666666 } );

        var birthday = new THREE.Mesh( textGeo, textMaterial );
        birthday.position.set( -300, 100, 10 );

        scene.add( birthday );

    } );


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