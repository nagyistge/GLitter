var SpherePage = new GLitter.Page({
    title: "Sphere",
    initializor: function (scene) {
        var context = {};
        var sphereMaterial = new THREE.MeshLambertMaterial({ ambient: 0xee4444 });
        var sphereGeometry = new THREE.SphereGeometry(1, 20, 20);
        context.sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        context.sphere.position.z = -5;
        scene.add(context.sphere);

        scene.add(new THREE.AmbientLight(0x999999));
        return context;
    },
    finalizor: function() {
        GLitter.hideInfo();
    },
    updator: function (context) {
        return function (scene) {
            GLitter.showInfo(GLitter.matrix2html(scene.camera.projectionMatrix));

            return ! context.STOP;
        }
    },
    gui: function (scene, context) {
        var upm = function(){scene.camera.updateProjectionMatrix()};
        scene.gui.add(scene.camera, 'fov', 1, 179).onChange(upm);
        scene.gui.add(scene.camera, 'aspect', 0.1, 10).onChange(upm);
        scene.gui.add(scene.camera, 'near', 0.1, 10).onChange(upm);
        scene.gui.add(scene.camera, 'far', 0.1, 10).onChange(upm);
    }
});
