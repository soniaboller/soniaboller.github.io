var app = app || {};
app.init = init;
app.animate = animate;
var container, points = [];
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
// createScene();

// function createScene(){
    container = document.createElement('div');
    container.setAttribute('id', 'container');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 0, 0, 750 );
    scene = new THREE.Scene();
    renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.autoClearColor = false;
    container.appendChild(renderer.domElement);
    // var stats = new Stats();
    // stats.showPanel( 0 );
    // document.body.appendChild( stats.dom );

    var GuiControls = function(){
        this.color = {};
    };
    var wave = new GuiControls();
    var gui = new dat.GUI();
    gui.add(wave, 'color', {Red: 'red', Orange: 'orange', Yellow: 'yellow', Green: 'green', Blue: 'blue', Purple: 'purple'})
    .name('Color').listen().onChange(function(){
        if (points.length >= 2048){
            clearCanvas();
        }
        init();
    });

    function init() {
        var colors;
        var redColors = [0xff0000, 0xb20000, 0x7f0000, 0x000000, 0xffffff];
        var orangeColors = [0xffd700, 0xffa500, 0xff8c00, 0x000000, 0xffffff];
        var yellowColors = [0xffff66, 0xffff00, 0x999900, 0x000000, 0xffffff];
        var greenColors = [0x00ff00, 0x00b200, 0x006600, 0x000000, 0xffffff];
        var blueColors = [ 0x0900ff, 0x0078ff, 0x00f9ff, 0x000000, 0xffffff];
        var purpleColors = [0xee82ee, 0xff00ff, 0x9400d3, 0x000000, 0xffffff];
        if(wave.color === 'red'){
            colors = redColors;
        }
        else if(wave.color === 'orange'){
            colors = orangeColors;
        }
        else if(wave.color === 'yellow'){
            colors = yellowColors;
        }
        else if(wave.color === 'green'){
            colors = greenColors;
        }
        else if(wave.color === 'blue'){
            colors = blueColors;
        }
        else if(wave.color === 'purple'){
            colors = purpleColors;
        }
        for (var i = 0; i < 2048; i++) {
            var geometry = new THREE.Geometry();
            var vertex = new THREE.Vector3();
            // geometry.verticesNeedUpdate = true;
            vertex.x = 0;
            vertex.y = (i-1024);
            vertex.z = 1;
            geometry.vertices.push(vertex);
            geometry.colors.push(new THREE.Color(colors[ Math.floor(Math.random() * colors.length) ]));
            // console.log(geometry);
            var material = new THREE.PointsMaterial( {
                size: 1,
                vertexColors: THREE.VertexColors,
                depthTest: false,
                opacity: 1,
                sizeAttenuation: false
                } );
            var mesh = new THREE.Points( geometry, material );
            scene.add( mesh );
            points.push( mesh );
        }
        document.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
        document.addEventListener('keydown', onKeyDown, false);
        // animate();
    }

    function clearCanvas(){
        renderer.clearColor();
        renderer.clearStencil();
        renderer.clearDepth();
        for (var j = 0; j < points.length; j++){
            var point = points[j];
            scene.remove(point);
            point.geometry.dispose();
            point.material.dispose();
        }
    }

    function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
    }

    function onMouseMove(event) {
        mouseX = (event.clientX - windowHalfX ) * 7;
        mouseY = (event.clientY - windowHalfY ) * 7;
    }

    function animate() {
        app.animationFrame = (window.requestAnimationFrame || window.webkitRequestAnimationFrame)(animate);
        // stats.begin();
        render();
        // stats.end();
    }

    function render() {
        var timeFrequencyData = new Uint8Array(analyser.fftSize);
        var timeFloatData = new Float32Array(analyser.fftSize);
        analyser.getByteTimeDomainData(timeFrequencyData);
        analyser.getFloatTimeDomainData(timeFloatData);
        for (var j = 0; j < points.length; j++){
            var point = points[j];
            // point.geometry.vertices[0].x += Math.sin(j);
            // point.geometry.vertices[0].y += Math.cos(j);
            // point.geometry.vertices[0].z = (timeFloatData[j] * timeFrequencyData[j] * 250);
            // console.log(point.geometry.vertices[0].z);

            point.position.x = point.geometry.vertices[0].x;
            point.position.y = point.geometry.vertices[0].y;

            // else if ((timeFloatData[j] * timeFrequencyData[j] * 100) >= 10000 || (timeFloatData[j] * timeFrequencyData[j] * 100) <= -10000){
            //     console.log('out of range')
            // }
            // else{
                point.position.z = (-(timeFrequencyData[j])/3);
            // }
            // console.log(j);
            // camera.position.x = Math.sin(j/2048)*500;
            // camera.position.y = -Math.cos(j/2048)*500;
            // camera.position.z = Math.sin(j/2048)*700;
            // add audio integration here
        }

        // need camera position x and y to revolve around at the same speed as the rotation matrix, but oscillate on the sin and cos wave
        camera.position.x += ( - mouseX - camera.position.x ) * .002;
        camera.position.y += ( mouseY - camera.position.y ) * .002;
        var rotationMatrix = new THREE.Matrix4().makeRotationZ( Math.PI / 1500 );
        camera.up.applyMatrix4(rotationMatrix);
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

function onKeyDown(e) {
    switch (e.which) {
        case 32:
            if (app.play) {
                app.audio.pause();
                app.play = false;
            } else {
                app.audio.play();
                app.play = true;
            }
            break;
    }
}

// }