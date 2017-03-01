var app = {} || app;
app.play = true;

var controls, camera, scene, renderer;
var cameraCube, sceneCube;
var textureEquirec, textureSphere;
var cubeMesh, sphereMesh, sphereMesh2;
var sphereMaterial;
var ianTexture, soniaTexture, ian, sonia;
var start = Date.now();
init();
animate();
function init() {
    app.audio = document.getElementsByTagName('audio');
    console.log(app.audio)
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

    var pointLightFront = new THREE.PointLight( 0x0000ff, 30, 400 );
    pointLightFront.position.set( 0, 300, 200 );
    scene.add( pointLightFront );

    var pointLightBack = new THREE.PointLight( 0x00ff00, 30, 400 );
    pointLightBack.position.set( 0, 300, -200 );
    scene.add( pointLightBack );


    var pointLightBottom = new THREE.PointLight( 0xff0000, 20, 400 );
    pointLightBottom.position.set( 0, -100, 0 );
    scene.add( pointLightBottom );

    var pointLightLeft = new THREE.PointLight( 0xffff00, 10, 400 );
    pointLightLeft.position.set( -500, 100, 0 );
    scene.add( pointLightLeft );

    var pointLightRight = new THREE.PointLight( 0xffff00, 10, 400 );
    pointLightRight.position.set( 500, 100, 0 );
    scene.add( pointLightRight );

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
    ian.scale.set(175, 225, 0);
    ian.position.set(500,210,1);
    sonia = new THREE.Sprite( soniaMaterial );
    sonia.scale.set(175, 225, 0);
    sonia.position.set(-500,210,1);

    scene.add(ian);
    scene.add(sonia);

    var loader = new THREE.FontLoader();

    loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {

        var textGeo = new THREE.TextGeometry( "HAPPY BIRTHDAY!", {

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
    cubeMesh.visible = true;
    sceneCube.add( cubeMesh );

    var geometry = new THREE.SphereGeometry( 200.0, 24, 24 );
    sphereMaterial = new THREE.MeshBasicMaterial( { envMap: textureEquirec } );
    sphereMaterial.needsUpdate = true;
    sphereMesh = new THREE.Mesh( geometry, sphereMaterial );
    sphereMesh.position.x = -500;
    sphereMesh.position.y = -100;
    sphereMesh2 = new THREE.Mesh( geometry, sphereMaterial );
    sphereMesh2.position.x = 500;
    sphereMesh2.position.y = -100;
    scene.add( sphereMesh );
    scene.add( sphereMesh2 );

    renderer = new THREE.WebGLRenderer();
    renderer.autoClear = false;
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.setFaceCulling( THREE.CullFaceNone );
    document.body.appendChild( renderer.domElement );
    //
}

function onKeyDown(e) {
    switch (e.which) {
        case 32:
                if (app.play) {
                    app.audio[0].pause();
                    app.play = false;
                } else {
                    app.audio[0].play();
                    app.play = true;
                }
            }
}

document.addEventListener('keydown', onKeyDown, false);
document.addEventListener('resize', onWindowResize, false);

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
    var timer = Date.now() - start;
    camera.lookAt( scene.position );
    // sphereMesh.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
    // sphereMesh2.position.y = Math.abs( Math.sin( timer * 0.002 ) ) * 150;
    ian.position.y = 200 + (Math.abs( Math.cos( timer * 0.002 ) ) * 150);
    sonia.position.y = 200 + (Math.abs( Math.sin( timer * 0.002 ) ) * 150);
    cameraCube.rotation.copy( camera.rotation );
    renderer.render( sceneCube, cameraCube );
    renderer.render( scene, camera );
}