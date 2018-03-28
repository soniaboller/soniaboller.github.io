var container, stats;
var camera, scene, renderer;
var raycaster, mouse;
var PI2 = Math.PI * 2;
var particles = [];
var intersectedObj;
var intCount = 0;
var intTimer;

var programFill = function (ctx) {
    ctx.beginPath();
    ctx.arc( 0, 0, 0.5, 0, PI2, true );
    ctx.fill();
};
var programStroke = function (ctx) {
    ctx.lineWidth = 0.025;
    ctx.beginPath();
    ctx.arc( 0, 0, 0.5, 0, PI2, true );
    ctx.stroke();
};
var programStrokeThick = function (ctx) {
    ctx.lineWidth = 0.05;
    ctx.beginPath();
    ctx.arc( 0, 0, 0.5, 0, PI2, true );
    ctx.stroke();
};

$.ajax({
    url : 'https://data.nasa.gov/resource/y77d-th95.json?$limit=50000',
    type : 'GET',
    dataType:'json',
    success : function(data) {
        $('#loading').css('display','none');
        init(data);
    },
    error : function(error)
    {   
        $('#loading').text(error);
        console.log(error)
    }
});

function init(meteoriteData) {
    console.log(meteoriteData)
    meteoriteData.sort(function(a, b) {
        let year1 = new Date(a.year).getFullYear();
        let year2 = new Date(b.year).getFullYear();
          return year1 - year2;
    });

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(0, 0, 375);

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

       for (var i = 0; i < meteoriteData.length; i ++) {
            let meteorite = meteoriteData[i];
            if(meteorite.geolocation != null) {
                particle = particles[i] = new THREE.Sprite(new THREE.SpriteCanvasMaterial( { color: 0x000000, program: programStrokeThick } ));
                particle.position.x = meteorite.geolocation.coordinates[0];
                particle.position.y = meteorite.geolocation.coordinates[1];
                particle.position.z = 1000;
                particle.scale.x = particle.scale.y = 1.25;
                // if(meteorite.mass > 15000){
                //     // particle.material.program = programStrokeThick;
                //     particle.scale.x = particle.scale.y = 1.5;
                // }
                // particle.scale.x = particle.scale.y = 2;
                // particle.year = new Date(meteorite.year).getFullYear();
                particle.name =  meteorite.name + ' - ' + new Date(meteorite.year).getFullYear();
                scene.add(particle);
            }
        }

    renderer = new THREE.CanvasRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();
    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.maxDistance = 350;

    container.appendChild(renderer.domElement);
    // stats = new Stats();
    // container.appendChild( stats.dom );
    document.addEventListener('mousemove', onDocumentMouseMove, false);
    window.addEventListener('resize', onWindowResize, false);
    setupTweenInterval();
    animate();
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}
function onDocumentMouseMove(e) {
    e.preventDefault();
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (e.clientY / window.innerHeight) * 2 + 1;
}
function setupTweenInterval() {
     if (intCount < particles.length){
        intTimer = setInterval(function(){
            let particle = particles[intCount];
            if(particle !== 'undefined' && particle != null){
                setupTween(particle);
            }
            intCount++;
         }, 25);

    }
    else if(intCount >= particles.length){
        clearInterval(intTimer);
    }
}

function updateInfo(particle){
    if(intersectedObj == null){
        $('#info').text(particle.name);
    }
}

function setupTween(particle){
    var position =  particle.position;
    var target = {
        x : particle.position.x, 
        y: particle.position.y, 
        z: 1
    };
    var tween = new TWEEN.Tween(position).to(target, 2000)
    tween.onComplete(function (){ 
        updateInfo(particle) 
    });
    tween.start();
}

function animate() {
    requestAnimationFrame(animate);
    render();
    // stats.update();
}
function render() {
    TWEEN.update();
    camera.lookAt(scene.position);
    camera.updateMatrixWorld();
    raycaster.setFromCamera(mouse, camera);
    var intersects = raycaster.intersectObjects(scene.children);
    if (intersects.length > 0) {
        if (intersectedObj != intersects[ 0 ].object) {
            if (intersectedObj) intersectedObj.material.program = programStroke;
            intersectedObj = intersects[ 0 ].object;
            intersectedObj.material.program = programFill;
            $('#info').text(intersectedObj.name)
            // console.log(intersectedObj)
        }
    } else {
        if (intersectedObj) intersectedObj.material.program = programStroke;
        intersectedObj = null;
    }
    renderer.render(scene, camera);
}