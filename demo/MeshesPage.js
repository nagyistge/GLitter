"use strict";
var MeshesPage = new GLitter.Page({
    title: "Objects Are Meshes",
    initializor: function (scene) {
        var context = {};
        scene.jsonLoader.load("demo/skull.js", function(geometry, materials) {
            context.skullWrapper = new THREE.Object3D();
            context.skull = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ));
            context.skullWrapper.scale.set(0.3,0.3,0.3);
            context.skullWrapper.rotation.set(-0.5,0,0);
            context.skullWrapper.add(context.skull);
            scene.add(context.skullWrapper);
            scene.add(new THREE.AmbientLight(0x556677));
            var pointLight = new THREE.PointLight(0xffffff, 1, 100);
            pointLight.position.set(0,0,10);
            scene.add(pointLight);
        });

        scene.cameraControls.reset();
        scene.camera.position.set(0,3,5);
        return context;
    },
    finalizor: function (scene, context) {
        if (context.skull) {
            context.skull.material.materials[0].wireframe = false;
            context.skull.material.materials[1].wireframe = false;
        }
    },
    updator: function (context) {
        return function(scene) {
            if (context.skull && ! context.skullSeen) {
                context.skullSeen = true;
                scene.gui.add(context.skull.material.materials[1], 'wireframe');
                scene.gui.add(context.skull.material.materials[0], 'wireframe');
            }
            return ! context.STOP;
        }
    },
    gui: function(scene, context) {
    }
});
