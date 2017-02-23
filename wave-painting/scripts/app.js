var app = app || {};
var container, points = [];
var camera, scene, renderer;
var mouseX = 0, mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
createScene();

function createScene(){
    container = document.createElement('div');
    container.setAttribute('id', 'container');
    document.body.appendChild(container);
    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set( 100000, 0, 3200 );
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
        if (points.length >= 3850){
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
        for (var i = 0; i < 3850; i++) {
            var geometry = new THREE.Geometry();
            var vertex = new THREE.Vector3();
            vertex.x = Math.sin(i);
            vertex.y = Math.cos(i);
            vertex.z = Math.random() * (i/2);
            geometry.vertices.push( vertex );
            geometry.colors.push(new THREE.Color(colors[ Math.floor(Math.random() * colors.length) ]));
            var material = new THREE.PointsMaterial( {
                size: 0.75,
                vertexColors: THREE.VertexColors,
                depthTest: false,
                opacity: 0.75,
                sizeAttenuation: false
                } );
            var mesh = new THREE.Points( geometry, material );
            scene.add( mesh );
            points.push( mesh );
        }
        document.addEventListener('mousemove', onMouseMove, false);
        window.addEventListener('resize', onWindowResize, false);
        animate();
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
        camera.position.x += ( - mouseX - camera.position.x ) * .02;
        camera.position.y += ( mouseY - camera.position.y ) * .02;
        camera.lookAt(scene.position);
        renderer.render(scene, camera);
    }

}