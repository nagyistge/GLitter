"use strict";
var IntroductionPage = new GLitter.Page({
    title: "★ ★ ★ Having Fun With WebGL ★ ★ ★",
    subtitle: "<p><span>Axial Lyceum</span></p>" +
              "<p><span>February 25<sup>th</sup>, 2014</span></p>" +
              "<p><span>Ben Holzman - ben.holzman@axial.net</span></p>",
    initializor: function (scene) {
        var axialTexture = THREE.ImageUtils.loadTexture('demo/logo.medium.png');
        var axialMaterial = new THREE.SpriteMaterial( { map: axialTexture, useScreenCoordinates: false, color: 0x999999, transparent: true, opacity: 0 } );

        var axialLogos = [];
        for (var i = 0; i < 100; i++) {
            var axialLogo = new THREE.Sprite(axialMaterial);
            var scale = (Math.random() * 3) + 1;
            axialLogo.scale.set(3 * scale,.58 * scale,1.0);
            axialLogo.position.set(Math.random()*10 - 5, Math.random()*10 - 5, Math.random()*10 - 5);
            axialLogo.direction = new THREE.Vector3((Math.random() - 0.5) / 10, (Math.random() - 0.5) / 10, (Math.random() - 0.5) / 10);
            scene.add(axialLogo);
            axialLogos.push(axialLogo);
        }

        var floor = new THREE.Mesh(
            new THREE.PlaneGeometry(200,100,100,100),
            new THREE.MeshLambertMaterial( { color: 0xdddddd, ambient: 0xdddddd, side: THREE.DoubleSide} )
        );
        //floor.receiveShadow = true;
        floor.position.set(0,-23,0);
        floor.rotation.set(-Math.PI/2,0.001,0.001);
        scene.add(floor);

        var wall = new THREE.Mesh(
            new THREE.PlaneGeometry(200,100,100,100),
            new THREE.MeshLambertMaterial( { color: 0xdddddd, ambient: 0xdddddd} )
        );
        //wall.receiveShadow = true;
        wall.position.set(0,26.8,-50)
        wall.rotation.set(0.001, 0.001, 0.001);
        scene.add(wall);

        scene.add(new THREE.AmbientLight(0x556677));
        var pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(4,3,1);
        scene.add(pointLight);

        scene.cameraControls.reset();
        scene.camera.position.set(0,5,12);
        return { floor:floor, wall: wall, axialLogos: axialLogos, axialMaterial: axialMaterial, tick: 0};
    },
    finalizor: function() {
        dat.GUI.toggleHide();
    },
    updator: function (context) {
        return function(scene) {
            if (context.tick) {
                var logos = context.axialLogos;
                for (var i = 0, l = logos.length; i < l; i++) {
                    logos[i].position.add(logos[i].direction);
                }
                context.axialMaterial.opacity = (Math.sin(context.tick / 30) + 1) / 2;
                context.tick += 1;
                if (context.tick > 1000) {
                    context.tick = 1;
                    for (var i = 0; i < context.axialLogos.length; i++) {
                        context.axialLogos[i].direction.negate();
                    }
                }
            }
            return ! context.STOP;
        }
    },
    onKeydown: function(scanCode, context) {
        if (scanCode === 83 || scanCode === 115) { // "S" or "s"
            for (var i = 0; i < context.axialLogos.length; i++) {
                context.axialLogos[i].direction.negate();
            }
            return true;
        } else if (!context.tick && scanCode === 13) {
            context.tick = 235.6; // so opacity starts at 0
            return true;
        }
        return;
    },
    gui: function(scene, context) {
        dat.GUI.toggleHide();
    }
});
