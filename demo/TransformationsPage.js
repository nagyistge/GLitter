"use strict";
var TransformationsPage = new GLitter.Page({
    title: "Transformations",
    initializor: function (scene) {
        var context = {};

        context.cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1,4,4,4),
                                      new THREE.MeshBasicMaterial({color: 0x44598, wireframe: true}));
        var PI2 = 2 * Math.PI;
        context.cube.rotation.set(PI2,PI2,PI2);
        context.cube.position.set(0.0,0.0,0.0);
        context.cube.scale.set(1.0,1.0,1.0);
        scene.add(context.cube);

        scene.add(new THREE.AmbientLight(0x556677));
        var pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(10,10,10);
        scene.add(pointLight);

        scene.cameraControls.reset();
        scene.camera.position.set(0,3,3);

        context.RESET = false;
        return context;
    },
    finalizor: function() {
        GLitter.hideInfo();
    },
    updator: function (context) {
        return function(scene) {
            var PI2 = 2 * Math.PI;
            GLitter.showInfo(GLitter.matrix2html(context.cube.matrix));
            if (context.RESET) {
                context.RESET = false;
                context.cube.rotation.set(PI2,PI2,PI2);
                context.cube.position.set(0.0,0.0,0.0);
                context.cube.scale.set(1.0,1.0,1.0);
            }
            return ! context.STOP;
        }
    },
    onKeydown: function(scanCode) {
        if (scanCode === 13) {
            return true;
        }
        return;
    },
    gui: function(scene, context) {
        var PI2 = 2 * Math.PI;
        var cubePosition = scene.gui.addFolder('Cube Position');
        cubePosition.add(context.cube.position, 'x', -2, 2).listen();
        cubePosition.add(context.cube.position, 'y', -2, 2).listen();
        cubePosition.add(context.cube.position, 'z', -2, 2).listen();
        var cubeRotation = scene.gui.addFolder('Cube Rotation');
        cubeRotation.add(context.cube.rotation, 'x',-PI2,PI2).listen();
        cubeRotation.add(context.cube.rotation, 'y',-PI2,PI2).listen();
        cubeRotation.add(context.cube.rotation, 'z',-PI2,PI2).listen();
        var cubeScale = scene.gui.addFolder('Cube Scale');
        cubeScale.add(context.cube.scale, 'x',0,5).listen();
        cubeScale.add(context.cube.scale, 'y',0,5).listen();
        cubeScale.add(context.cube.scale, 'z',0,5).listen();
        scene.gui.add(context, 'RESET').listen();
    }
});
