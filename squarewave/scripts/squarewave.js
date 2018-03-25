var app = app || {};
$(document).ready(function() {
    var xSeparation = 1.1, ySeparation = 1.1, xNum = 65, yNum = 65,
     // var xSeparation = 1.1, ySeparation = 1.1, xNum = 45, yNum = 45,
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
        // camera.position.set(0, 0, 150);

        renderer.setClearColor(0x000000, 1);

        particles = new Array();

        // move this into the particle generating loop for color changing, but prevents bottom tiles from being accessed for rotation

        var i = 0;
        for (var iy = 0; iy < yNum; iy++) {
            for (var ix = 0; ix < xNum; ix++) {
                var material = new THREE.SpriteMaterial({
                    color: 0xffffff
                });
                var particle = particles[i++] = new THREE.Sprite(material);
                particle.position.x = ix * xSeparation - (( xNum * xSeparation ) / 2);
                particle.position.y = iy * ySeparation - (( yNum * ySeparation ) / 2);
                // particle.position.z = 3 * Math.sin(ix);
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

        function handleResize(){
            width = window.innerWidth;
            height = window.innerHeight;
            windowHalfX = window.innerWidth / 2;
            windowHalfY = window.innerHeight / 2;
            renderer.setSize(width, height);
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
        }

        document.addEventListener('mousemove', onDocumentMouseMove, false);
        document.addEventListener('touchstart', onDocumentTouchStart, false);
        document.addEventListener('touchmove', onDocumentTouchMove, false);
        window.addEventListener('resize', handleResize, false);

        var counter = 0;
        var count = 0;

        var GuiControls = function(){
            this.positionIntensity = 15;
            this.positionSpeed = 6;
            this.scaleSpeed = 3;
            // this.positionIntensity = 5;
            // this.positionSpeed = 8;
            // this.scaleSpeed = 4;
            this.time = 60;
            this.colorControl = 10;
            this.default = true;
            this.toggleRed = false;
            this.toggleGreen = false;
            this.toggleBlue = false;
        };
        var controls = new GuiControls();
        var gui = new dat.GUI();
        gui.closed = true;
        gui.add(controls, 'positionIntensity', 0, 25).name('Position Intensity');
        gui.add(controls, 'positionSpeed', 0, 25).name('Position Speed');
        gui.add(controls, 'scaleSpeed', 0, 25).name('Scale Speed');
        gui.add(controls, 'time', 0, 120).name('Time Divider');
        gui.add(controls, 'colorControl', 0, 25).name('Color Speed');
        gui.add(controls, 'default').name('All White').listen().onChange(function(){
            for (var j = 0; j < particles.length; j++) {
                particle = particles[j];
                particle.material.color.r = 1;
                particle.material.color.g = 1;
                particle.material.color.b = 1;
            }
            controls.default = true;
            controls.toggleRed = false;
            controls.toggleGreen = false;
            controls.toggleBlue = false;
        });
        gui.add(controls, 'toggleRed').name('Red Emphasis').listen().onChange(function(){
            for (var j = 0; j < particles.length; j++) {
                particle = particles[j];
                particle.material.color.r = Math.random();
                particle.material.color.g = Math.random();
                particle.material.color.b = Math.random();
            }
            controls.default = false;
            controls.toggleRed = true;
            controls.toggleGreen = false;
            controls.toggleBlue = false;
        });

        gui.add(controls, 'toggleGreen').name('Green Emphasis').listen().onChange(function(){
            for (var j = 0; j < particles.length; j++) {
                particle = particles[j];
                particle.material.color.r = Math.random();
                particle.material.color.g = Math.random();
                particle.material.color.b = Math.random();
            }
            controls.default = false;
            controls.toggleRed = false;
            controls.toggleGreen = true;
            controls.toggleBlue = false;
        });

        gui.add(controls, 'toggleBlue').name('Blue Emphasis').listen().onChange(function(){
            for (var j = 0; j < particles.length; j++) {
                particle = particles[j];
                particle.material.color.r = Math.random();
                particle.material.color.g = Math.random();
                particle.material.color.b = Math.random();
            }
            controls.default = false;
            controls.toggleRed = false;
            controls.toggleGreen = false;
            controls.toggleBlue = true;
        });


        function animate() {
            requestAnimationFrame(animate);
            var timeFloatData = [];
            if(app.audio || app.microphone){
                timeFloatData = new Float32Array(analyser.fftSize);
                analyser.getFloatTimeDomainData(timeFloatData);
            }
            for (var j = 0; j < particles.length; j++) {
                var time = (counter + j)/controls.time;
                particle = particles[j];
                particle.scale.x = particle.scale.y = (Math.sin(time  * controls.scaleSpeed));
                if(app.audio || app.microphone){
                    particle.position.z = controls.positionIntensity * Math.sin(timeFloatData[j] * controls.positionSpeed);
                    if(controls.toggleRed){
                        particle.material.color.r = Math.sin(particle.position.z * 10 / time * controls.colorControl);
                    }
                    else if(controls.toggleGreen){
                        particle.material.color.g = Math.sin(particle.position.z * 10/ time * controls.colorControl);
                    }
                    else if(controls.toggleBlue){
                        particle.material.color.b = Math.sin(particle.position.z * 10/ time * controls.colorControl);
                    }
                }
                else{
                    particle.position.z = controls.positionIntensity * Math.sin(time * controls.positionSpeed);
                    if(controls.toggleRed){
                        particle.material.color.r = Math.sin(particle.position.z / controls.colorControl)* 1.25;
                    }
                    else if(controls.toggleGreen){
                        particle.material.color.g = Math.sin(particle.position.z / controls.colorControl)* 1.25;
                    }
                    else if(controls.toggleBlue){
                        particle.material.color.b = Math.sin(particle.position.z / controls.colorControl) * 1.5;
                    }
                }
            }

            camera.position.x += 4 * Math.cos(time) +( mouseX - camera.position.x ) * 0.05;
            camera.position.y += 4 * Math.cos(time) +( -mouseY - camera.position.y ) * 0.075;

            // camera.position.x = ( mouseX - camera.position.x ) * 0.05;
            // camera.position.y = ( -mouseY - camera.position.y ) * 0.075;
            camera.lookAt(scene.position);
            renderer.render(scene, camera);
            counter++;
        }
        animate();
    }

});