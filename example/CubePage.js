var CubePage = new GLitter.Page({
    title: "Cube",
    subtitle: "Spinning!",
    initializor: function (scene) {
        var context = {};
        var cubeMaterial = new THREE.MeshLambertMaterial({ color: 0xee4444});
        var cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        context.cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        context.cube.position.z = -2.5;
        scene.add(context.cube);

        var spin = function() {
            new TWEEN.Tween(context.cube.rotation)
                     .to({y: context.cube.rotation.y - 2*Math.PI}, 2000)
                     .start()
                     .onComplete(spin);
        }
        spin();
        scene.add(new THREE.PointLight(0x999999));
        scene.camera.position.z = 2.5;
        return context;
    },
    finalizor: function() {
        GLitter.hideInfo();
    },
    updator: function (context) {
        return function (scene) {
            GLitter.showInfo(GLitter.matrix2html(context.cube.matrix));

            return ! context.STOP;
        }
    },
    gui: function (scene, context) {
        scene.gui.add(context.cube.scale, 'x', 0.1, 5);
        scene.gui.add(context.cube.scale, 'y', 0.1, 5);
        scene.gui.add(context.cube.scale, 'z', 0.1, 5);
    }
});
