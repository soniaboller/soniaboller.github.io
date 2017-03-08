var app = app || {};
app.init = init;
app.animate = animate;
var container, points = [];
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
var start = Date.now();

container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);
camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
camera.position.set( 0, 0, 50 );
scene = new THREE.Scene();
renderer = new THREE.WebGLRenderer({preserveDrawingBuffer: true});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.autoClearColor = true;
container.appendChild(renderer.domElement);
controls = new THREE.OrbitControls( camera, renderer.domElement );

var GuiControls = function(){
    this.spacing = 15;
    this.angle = 0.975000;
    this.animationSpeed = 0.00001;
    this.intensity = 1;
    this.zoomSpeed = 0.01;
    this.R = 0;
    this.G = 0;
    this.B = 0;
    this.colorIntensity = 0.5;
    this.rotationSpeed = 0.0001;
    this.sphere = true;
    this.donut = false;
    this.longDonut = false;
    this.perogi = false;
    this.square = false;
    this.infinity = false;
    this.longDonut2 = false;

};

var matrix = new GuiControls();

var gui = new dat.GUI();
gui.closed = true;
gui.add(matrix, 'spacing', 0, 50).step(0.1).name('Particle Spacing');
gui.add(matrix, 'angle', 0, 25).step(0.1).name('Particle Angle');
gui.add(matrix, 'animationSpeed', 0.0000001, 0.01).step(0.00001).name('Animation Speed');
gui.add(matrix, 'intensity', 0.5, 5).step(0.1).name('Reaction Intensity');
gui.add(matrix, 'colorIntensity', 0.5, 5).step(1).name('Color Intensity');
gui.add(matrix, 'zoomSpeed', 0.001, 0.1).step(0.001).name('Zoom Speed');
gui.add(matrix, 'rotationSpeed', 0, 0.1).step(0.000005).name('Z-index Rotation Speed');

var stats = new Stats();
stats.showPanel( 0 );
document.body.appendChild( stats.dom );
init();

function init() {
    // var colors;
    // var redColors = [0xff0000, 0xb20000, 0x7f0000, 0x000000, 0xffffff];
    // var orangeColors = [0xffd700, 0xffa500, 0xff8c00, 0x000000, 0xffffff];
    // var yellowColors = [0xffff66, 0xffff00, 0x999900, 0x000000, 0xffffff];
    // var greenColors = [0x00ff00, 0x00b200, 0x006600, 0x000000, 0xffffff];
    // var blueColors = [ 0x0900ff, 0x0078ff, 0x00f9ff, 0x000000, 0xffffff];
    // var purpleColors = [0xee82ee, 0xff00ff, 0x9400d3, 0xffffff];
    for (var i = 0; i < 1024; i++) {
        var geometry = new THREE.Geometry();
        var vertex = new THREE.Vector3();
        // vertex.x = 20 * Math.sin(i/10) * Math.cos(i);
        // vertex.y = 20 * Math.cos(i/10);
        // vertex.z = 20 * Math.sin(i) * Math.sin(i/10);
        // // // vertex.y = i/100 * Math.cos(i/10) - i/100 * Math.sin(i/10);
        geometry.vertices.push(vertex);
        // geometry.colors.push(new THREE.Color(purpleColors[ Math.floor(Math.random() * purpleColors.length) ]));
        geometry.colors.push(new THREE.Color(0xffffff));
        var material = new THREE.PointsMaterial( {
            size: 0.33,
            vertexColors: THREE.VertexColors,
            depthTest: true,
            opacity: 1,
            sizeAttenuation: true
        } );
        var mesh = new THREE.Points( geometry, material );
        mesh.position.x = 20 * Math.sin(i/10) * Math.cos(i);
        mesh.position.y = 20 * Math.cos(i/10);
        mesh.position.z = 20 * Math.sin(i) * Math.sin(i/10);
        scene.add( mesh );
        points.push( mesh );
    }
    document.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    document.addEventListener('keydown', onKeyDown, false);
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
    stats.begin();
    render();
    stats.end();
}

function render() {
    var timeFrequencyData = new Uint8Array(analyser.fftSize);
    var timeFloatData = new Float32Array(analyser.fftSize);
    analyser.getByteTimeDomainData(timeFrequencyData);
    analyser.getFloatTimeDomainData(timeFloatData);

    for (var j = 0; j < points.length; j++){
        var point = points[j];
        // var prevPoint = points[j-1];
        var n = 1;
        n +=2;

        // point.geometry.vertices[0].x *= Math.sin(j/10);
        // point.geometry.vertices[0].y *= Math.sin(j/10);
        // point.geometry.vertices[0].z *= Math.sin(j/10);

        // point.position.x *= Math.sin(j);
        // point.position.y *= Math.sin(j);
        // point.position.z *= Math.sin(j);

        var timer = Date.now() - start;
        point.geometry.colorsNeedUpdate = true;

        if (j%3 !== 0 && j%2 !==0){
            // this stream mixes with the next stream
            point.geometry.colors[0].r = matrix.R + (timeFloatData[j] * matrix.colorIntensity);
            point.geometry.colors[0].g = 1;
            point.geometry.colors[0].b = matrix.B + (timeFloatData[j] * matrix.colorIntensity);
        }
        else if (j%2 === 0){
            point.geometry.colors[0].r = matrix.R + (timeFloatData[j] * matrix.colorIntensity);
            point.geometry.colors[0].g = matrix.G + (timeFloatData[j] * matrix.colorIntensity);
            point.geometry.colors[0].b = 1;
        }
        else if(j%3 === 0){
            // this is a dominant color
            point.geometry.colors[0].r = 1;
            point.geometry.colors[0].g = matrix.G + (timeFloatData[j] * matrix.colorIntensity);
            point.geometry.colors[0].b = matrix.B + (timeFloatData[j] * matrix.colorIntensity);
        }

        // var R = matrix.R - (timeFloatData[j]);
        // var G = matrix.G - (timeFloatData[j]);
        // var B = matrix.B - (timeFloatData[j]);
        // point.geometry.colors[0].r = R;
        // point.geometry.colors[0].g = G;
        // point.geometry.colors[0].b = B;

        point.position.x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(j));
        point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) + Math.sin(j));
        // point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle)) + (Math.abs( Math.cos( timer * 0.002 ) ));



        // OG
        if(matrix.sphere){
            matrix.spacing = 15;
            point.position.x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j));
            point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle));
        }
        //donut
        else if(matrix.donut){
            matrix.spacing = 10;
            point.position.x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(j));
            point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) + Math.sin(j));
        }

        // long donut -- 14.3
        else if(matrix.longDonut){
            matrix.spacing = 10;
            point.position.x = matrix.spacing * (Math.sin(j/matrix.angle) + Math.cos(j));
            point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            point.position.z = matrix.spacing * (Math.sin(j) + Math.sin(j/matrix.angle));
        }
        // perogi
        else if(matrix.perogi){
            matrix.spacing = 15;
            point.position.x = matrix.spacing * (Math.cos(j/matrix.angle) * Math.cos(j));
            point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle));
        }
        // square thing
        else if(matrix.square){
            matrix.spacing = 10;
            point.position.x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.sin(j));
            point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) + Math.cos(j));
        }
        // tighter infinity -- remove z matrix rotaiton for this
        else if(matrix.infinity){
            matrix.spacing = 10;
            point.position.x = matrix.spacing * (Math.sin(j/matrix.angle) * Math.cos(j) + Math.cos(2*j/matrix.angle));
            point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            point.position.z = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) + Math.sin(2*j/matrix.angle));
        }
        // also a long donut
        else if(matrix.longDonut2){
            matrix.spacing = 10;
            point.position.x = matrix.spacing * (Math.cos(j/matrix.angle) + Math.cos(j));
            point.position.y = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
            point.position.z = matrix.spacing * (Math.sin(j) + Math.sin(j/matrix.angle));
        }




        // star thang rotation speed = 0.00413
        // point.position.y = matrix.spacing * (Math.cos(j/matrix.angle) * Math.cos(j) / Math.sin(j));
        // point.position.z = matrix.spacing * (Math.cos(j/matrix.angle)) + (timeFloatData[j] * matrix.intensity);
        // point.position.x = matrix.spacing * (Math.sin(j) * Math.sin(j/matrix.angle) / Math.cos(j));



    }
    matrix.angle += matrix.animationSpeed;
    // vertex.z = 20 * Math.sin(i/10);
    // vertex.y = 20 * Math.cos(i/10);
    // // vertex.y = i/100 * Math.cos(i/10) - i/100 * Math.sin(i/10);
    // vertex.x = 20 * Math.tan(i/100);

    var x = camera.position.x;
    var z = camera.position.z;
    camera.position.x = x * Math.cos(matrix.zoomSpeed) - z * Math.sin(matrix.zoomSpeed);
    camera.position.z = z * Math.cos(matrix.zoomSpeed) + x * Math.sin(matrix.zoomSpeed);

    // var z = camera.position.z;
    var y = camera.position.y;
    camera.position.y = y * Math.cos(matrix.zoomSpeed) + z * Math.sin(matrix.zoomSpeed);
    camera.position.z = z * Math.cos(matrix.zoomSpeed) - y * Math.sin(matrix.zoomSpeed);

    var rotationMatrix = new THREE.Matrix4().makeRotationZ( Math.PI * matrix.rotationSpeed );
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
        case 49:
            //1
            matrix.sphere = true;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 50:
            //2
            matrix.sphere = false;
            matrix.donut = true;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 51:
            //3
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = true;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 52:
            //4
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = true;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 53:
            //5
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = true;
            matrix.infinity = false;
            matrix.longDonut2 = false;
            break;
        case 54:
            //6
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = true;
            matrix.longDonut2 = false;
            break;
        case 55:
            //6
            matrix.sphere = false;
            matrix.donut = false;
            matrix.longDonut = false;
            matrix.perogi = false;
            matrix.square = false;
            matrix.infinity = false;
            matrix.longDonut2 = true;
            break;
    }
}


// var neither = [];
// var two = [];
// var three= [];
// for (var j = 0; j < 2048; j++){
//
//     if (j%3 !== 0 && j%2 !==0){
//         neither.push(j)
//     }
//     else if (j%3 === 0){
//         two.push(j);
//     }
//     else if(j%2 === 0){
//         three.push(j)
//     }
//     console.log(neither, 'neither');
//     console.log(two, 'two');
//     console.log(three, 'three');
// }