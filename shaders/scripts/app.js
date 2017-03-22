var app = app || {};
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var group;
var start = Date.now();
window.onload = function() {

    if (!Detector.webgl) Detector.addGetWebGLMessage();
    var container, stats;
    var camera, scene, renderer;
    var uniforms;

    init();
    animate();

    function init() {

        container = document.getElementById('container');

        camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 3000 );
        camera.position.set( 0, 0, 700 );

        scene = new THREE.Scene();

        uniforms = {
            time: {value: 1.0},
            resolution: {value: new THREE.Vector2()}
        };

        var material = new THREE.ShaderMaterial({
            uniforms: uniforms,
            vertexShader: document.getElementById('vertexShader').textContent,
            fragmentShader: document.getElementById('fragmentShader').textContent
        });

        var geometry = new THREE.PlaneBufferGeometry(window.innerWidth,window.innerHeight);
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        controls = new THREE.OrbitControls( camera, renderer.domElement );
        container.appendChild(renderer.domElement);

        // stats = new Stats();
        // container.appendChild(stats.dom);

        onWindowResize();
        document.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('keydown', onKeyDown, false);

    }

    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX ) * 10;
        mouseY = (event.clientY - windowHalfY ) * 10;
    }

    function onWindowResize(event) {

        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;

        renderer.setSize(window.innerWidth, window.innerHeight);

        uniforms.resolution.value.x = window.innerWidth;
        uniforms.resolution.value.y = window.innerHeight;

        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
    }


    function animate() {
        requestAnimationFrame(animate);
        render();
        // stats.update();
    }

    function render() {
        var timeFloatData = [];
        var timer = Date.now() - start;
        uniforms.time.value += 0.08;
        if(app.audio || app.microphone) {
            timeFloatData = new Float32Array(analyser.fftSize);
            analyser.getFloatTimeDomainData(timeFloatData);


            for (var j = 0; j < timeFloatData.length; j++) {
                if (app.audio){
                    uniforms.time.value += timeFloatData[j]/10;
                }
                else if(app.microphone){
                    uniforms.time.value += timeFloatData[j]/2;
                }
            }
        }
        renderer.render(scene, camera);
    }
};

function onKeyDown(e) {
    switch (e.which) {
        case 32:
            // audio play
            if (app.play && app.audio) {
                app.audio.pause();
                app.play = false;
            }
            else {
                app.audio.play();
                app.play = true;
            }

    }
}
