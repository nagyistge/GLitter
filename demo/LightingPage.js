"use strict";
var LightingPage = new GLitter.Page({
    title: "Lighting and Shadows",
    initializor: function (scene) {
        var context = {};
        scene.jsonLoader.load("demo/skull.js", function(geometry, materials) {
            materials[0] = new THREE.MeshPhongMaterial({
                color: materials[0].color,
                ambient: materials[0].ambient,
                emissive: materials[0].emissive
            });
            materials[1] = new THREE.MeshPhongMaterial({
                color: materials[1].color,
                ambient: materials[1].ambient,
                emissive: materials[1].emissive
            });
            context.skullWrapper = new THREE.Object3D();
            context.skull = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial( materials ));
            context.skull.receiveShadow = true;
            context.skull.castShadow = true;
            context.skullWrapper.scale.set(0.3,0.3,0.3);
            context.skullWrapper.rotation.set(-0.5,0,0);
            context.skullWrapper.add(context.skull);

            scene.gui.add(materials[1], 'shininess');
            scene.add(context.skullWrapper);
        });

        context.surface = new THREE.Mesh(new THREE.PlaneGeometry(10,10,100,100),
                                     new THREE.MeshPhongMaterial({color: 0xddeeff,
                                                                  shininess: 60,
                                                                  shading: THREE.SmoothShading,
                                                                  side: THREE.DoubleSide,
                                                                  transparent: true,
                                                                  opacity: 1.0}));
        context.surface.rotation.set(0, 1.2, 0);
        context.surface.position.set(-2.3,-2,0);
        context.surface.receiveShadow = true;
        scene.add(context.surface);

        scene.add(new THREE.AmbientLight(0x556677));

        context.spotLight = new THREE.SpotLight(0xffeeee);
        context.spotLight.position.set(6,4,3);
        context.spotLight.castShadow = true;
        context.spotLight.shadowCameraVisible = true;
        context.spotLight.shadowCameraNear = 1;
        context.spotLight.shadowCameraFar = 100;
        scene.add(context.spotLight);

        scene.cameraControls.reset();
        scene.camera.position.set(0,3,5);
        return context;
    },
    finalizor: function (scene, context) {
    },
    updator: function (context) {
        return function(scene) {
            return ! context.STOP;
        }
    },
    gui: function(scene, context) {
        var lightPos = scene.gui.addFolder('Light Position');
        lightPos.add(context.spotLight.position, 'x');
        lightPos.add(context.spotLight.position, 'y');
        lightPos.add(context.spotLight.position, 'z');
        scene.gui.add(context.spotLight, 'shadowCameraVisible');
        scene.gui.add(context.surface.material, 'opacity', 0, 1);
    }
});
