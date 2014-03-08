"use strict";
var ProjectionsPage = new GLitter.Page({
    title: "Projections",
    initializor: function (scene) {
        var context = {};

        context.cube = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),
                                      new THREE.MeshPhongMaterial({color: 0x044598, ambient: 0x044598, shading: THREE.SmoothShading}));
        context.cube.rotation.y = Math.PI / 4;
        scene.add(context.cube);

        scene.add(new THREE.AmbientLight({color:0x444444}));
        var dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(2,10,0);
        scene.add(dirLight);
        var dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
        dirLight.position.set(-5,7,3);
        scene.add(dirLight);

        scene.cameraControls.reset();
        scene.camera.position.set(0,3,3);

        context.originalParams = { fov: scene.camera.fov,
                                   aspect: scene.camera.aspect,
                                   near: scene.camera.near,
                                   far: scene.camera.far };

        context.RESET = false;
        return context;
    },
    finalizor: function(scene, context) {
        scene.camera.fov = context.originalParams.fov;
        scene.camera.aspect = context.originalParams.aspect;
        scene.camera.near = context.originalParams.near;
        scene.camera.far = context.originalParams.far;
        scene.camera.updateProjectionMatrix();
        GLitter.hideInfo();
    },
    updator: function (context) {
        return function(scene) {
            GLitter.showInfo(GLitter.matrix2html(scene.camera.projectionMatrix));
            return ! context.STOP;
        }
    },
    gui: function(scene, context) {
        function upm() { scene.camera.updateProjectionMatrix() }
        scene.gui.add(scene.camera, 'fov', 1, 179).listen().onChange(upm);
        scene.gui.add(scene.camera, 'aspect', 0.1, 10).listen().onChange(upm);
        scene.gui.add(scene.camera, 'near', 0.1, 10).listen().onChange(upm);
        scene.gui.add(scene.camera, 'far', 0.1, 10).listen().onChange(upm);
    }
});
