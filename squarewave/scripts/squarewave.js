let app = {};
$(document).ready(function() {
    // console.log(app, 'from square');
    var xSeparation = 1.1, ySeparation = 1.1, xNum = 65, yNum = 65,
        mouseX = 0, mouseY = 0,
        windowHalfX = window.innerWidth / 2,
        windowHalfY = window.innerHeight / 2;
    var camera, scene;
    init();
    function init() {
        scene = new THREE.Scene();
        var width = window.innerWidth;
        var height = window.innerHeight;

        var fov = 25;
        // var fov = 60;

        renderer = new THREE.CanvasRenderer();
        app.renderer = renderer;
        renderer.setSize(width, height);
        document.body.appendChild(app.renderer.domElement);

        camera = new THREE.PerspectiveCamera(fov, width / height, 1, 10000);
        camera.position.set(0, 0, 185);
        // camera.position.set(0, 0, 75);

        renderer.setClearColor(0x000000, 1);
        // CHANGE THIS into a function with an event lisenter instead
        window.addEventListener('resize', function () {
            width = window.innerWidth;
            height = window.innerHeight;
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        });

        var PI2 = Math.PI * 2;
        particles = new Array();

        // move this into the particle generating loop for color changing, but prevents bottom tiles from being accessed for rotation

        var i = 0;
        for (var iy = 0; iy < yNum; iy++) {
            var material = new THREE.SpriteMaterial({
                color: 0xffffff
            });
            for (var ix = 0; ix < xNum; ix++) {
                var particle = particles[i++] = new THREE.Sprite(material);
                particle.position.x = ix * xSeparation - (( xNum * xSeparation ) / 2);
                particle.position.y = iy * ySeparation - (( yNum * ySeparation ) / 2);
                // particle.position.z = 3 * Math.cos(ix);
                scene.add(particle);
            }
        }

        function onDocumentMouseMove(e) {
            mouseX = e.clientX - windowHalfX;
            mouseY = e.clientY - windowHalfY;
        }

        function onDocumentTouchStart(e) {
            if (e.touches.length === 1) {
                mouseX = e.touches[0].pageX - (windowHalfX - 10);
                mouseY = e.touches[0].pageY - (windowHalfY - 10);
            }
        }

        function onDocumentTouchMove(e) {
            if (e.touches.length === 1) {
                mouseX = e.touches[0].pageX - (windowHalfX - 10);
                mouseY = e.touches[0].pageY - (windowHalfY - 10);
            }
        }

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);


        var counter = 0;
        var count = 0;

        var GuiControls = function(){
            this.positionIntensity = 15;
            this.positionSpeed = 5.6;
            this.scaleSpeed = 3;
            this.time = 60;
        };
        var controls = new GuiControls();
        var gui = new dat.GUI();
        gui.closed = true;
        gui.add(controls, 'positionIntensity', 0, 25).name('Position Intensity');
        gui.add(controls, 'positionSpeed', 0, 25).name('Position Speed');
        gui.add(controls, 'scaleSpeed', 0, 25).name('Scale Speed');
        gui.add(controls, 'time', 0, 120).name('Time Divider');


        function animate() {
            requestAnimationFrame(animate);
            for (var j = 0; j < particles.length; j++) {
                var time = (counter + j)/controls.time;
                particle = particles[j];
                particle.position.z = controls.positionIntensity * Math.sin(time * controls.positionSpeed);
                particle.scale.x = particle.scale.y = (Math.sin(time  * controls.scaleSpeed));

                // particle.material.color.r = Math.sin(particle.position.z / time)/10;
                 // particle.material.color.g = Math.sin(particle.position.z / time);
                // particle.material.color.b = Math.sin(time * 5) * Math.cos(j);
                // particle.material.color.g = Math.sin(time * 4)* Math.cos(j);
                // particle.material.color.r = Math.sin(time * 3)* Math.cos(j);

                // console.log(particle.material.color.r)
                // particle.color = rgba(0, 0, , 1)
                // particle.material.rotation -= 0.0003;
            }

            camera.position.x = ( mouseX - camera.position.x ) * 0.05;
            camera.position.y = ( -mouseY - camera.position.y ) * 0.075;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            counter++;
        }
        animate();
    }

});