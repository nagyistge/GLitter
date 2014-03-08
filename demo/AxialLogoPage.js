"use strict";
var AxialLogoPage = new GLitter.Page({
    title: "Rotating Axial Logo",
    initializor: function (scene) {
        var floor = new THREE.Mesh(
            new THREE.PlaneGeometry(200,100,100,100),
            new THREE.MeshLambertMaterial( { color: 0xdddddd, ambient: 0xdddddd, side: THREE.DoubleSide} )
        );
        floor.receiveShadow = true;
        floor.position.set(0,-23,0);
        floor.rotation.set(-Math.PI/2,0.001,0.001);
        scene.add(floor);

        var wall = new THREE.Mesh(
            new THREE.PlaneGeometry(200,100,100,100),
            new THREE.MeshLambertMaterial( { color: 0xdddddd, ambient: 0xdddddd} )
        );
        wall.receiveShadow = true;
        wall.position.set(0,26.8,-50)
        wall.rotation.set(0.001, 0.001, 0.001);
        scene.add(wall);

        scene.add(new THREE.AmbientLight(0x556677));
        var pointLight = new THREE.PointLight(0xffffff, 1, 100);
        pointLight.position.set(4,3,1);
        scene.add(pointLight);

        var context = {};
        context.AxialGeometryText =
       "(function(){ return function (x) {\n" +
       "    THREE.Geometry.call(this);\n" +
       "\n" +
       "    this.vertices = [\n" +
       "      new THREE.Vector3(0,0,0),\n" +
       "      new THREE.Vector3(x,0,0),\n" +
       "      new THREE.Vector3(x/2,x,0),\n" +
       "      new THREE.Vector3(2*x,0,0),\n" +
       "      new THREE.Vector3((3/2)*x,x,0),\n" +
       "      new THREE.Vector3(3*x,0,0),\n" +
       "      new THREE.Vector3((5/2)*x,x,0),\n" +
       "      new THREE.Vector3(x,2*x,0),\n" +
       "      new THREE.Vector3(2*x,2*x,0),\n" +
       "      new THREE.Vector3((3/2)*x,3*x,0),\n" +
       "      new THREE.Vector3(x/2,3*x,0),\n" +
       "      new THREE.Vector3(0,0,x),\n" +
       "      new THREE.Vector3(x,0,x),\n" +
       "      new THREE.Vector3(x/2,x,x),\n" +
       "      new THREE.Vector3(2*x,0,x),\n" +
       "      new THREE.Vector3((3/2)*x,x,x),\n" +
       "      new THREE.Vector3(3*x,0,x),\n" +
       "      new THREE.Vector3((5/2)*x,x,x),\n" +
       "      new THREE.Vector3(x,2*x,x),\n" +
       "      new THREE.Vector3(2*x,2*x,x),\n" +
       "      new THREE.Vector3((3/2)*x,3*x,x),\n" +
       "      new THREE.Vector3(x/2,3*x,x)\n" +
       "    ];\n" +
       "\n" +
       "    var faces = [\n" +
       "      new THREE.Face3(0,2,1),\n" +
       "      new THREE.Face3(2,7,4),\n" +
       "      new THREE.Face3(1,2,4),\n" +
       "      new THREE.Face3(3,4,8),\n" +
       "      new THREE.Face3(3,8,6),\n" +
       "      new THREE.Face3(3,6,5),\n" +
       "      new THREE.Face3(4,7,9),\n" +
       "      new THREE.Face3(4,9,8),\n" +
       "      new THREE.Face3(7,10,9),\n" +
       "      new THREE.Face3(0,11,2),\n" +
       "      new THREE.Face3(11,13,2),\n" +
       "      new THREE.Face3(2,13,18),\n" +
       "      new THREE.Face3(18,2,7),\n" +
       "      new THREE.Face3(7,18,21),\n" +
       "      new THREE.Face3(21,7,10),\n" +
       "      new THREE.Face3(3,14,15),\n" +
       "      new THREE.Face3(15,3,4),\n" +
       "      new THREE.Face3(4,15,12),\n" +
       "      new THREE.Face3(12,1,4),\n" +
       "      new THREE.Face3(6,17,16),\n" +
       "      new THREE.Face3(16,6,5),\n" +
       "      new THREE.Face3(8,19,17),\n" +
       "      new THREE.Face3(17,8,6),\n" +
       "      new THREE.Face3(9,20,19),\n" +
       "      new THREE.Face3(19,9,8),\n" +
       "      new THREE.Face3(10,21,20),\n" +
       "      new THREE.Face3(20,10,9),\n" +
       "      new THREE.Face3(1,12,11),\n" +
       "      new THREE.Face3(11,0,1),\n" +
       "      new THREE.Face3(5,16,14),\n" +
       "      new THREE.Face3(14,3,5),\n" +
       "      new THREE.Face3(12,13,11),\n" +
       "      new THREE.Face3(15,18,13),\n" +
       "      new THREE.Face3(15,13,12),\n" +
       "      new THREE.Face3(17,19,15),\n" +
       "      new THREE.Face3(17,15,14),\n" +
       "      new THREE.Face3(16,17,14),\n" +
       "      new THREE.Face3(19,20,18),\n" +
       "      new THREE.Face3(19,18,15),\n" +
       "      new THREE.Face3(20,21,18)\n" +
       "    ];\n" +
       "\n" +
       "    faces[0].materialIndex = 0;\n" +
       "    faces[1].materialIndex = 1;\n" +
       "    faces[2].materialIndex = 1;\n" +
       "    faces[3].materialIndex = 2;\n" +
       "    faces[4].materialIndex = 2;\n" +
       "    faces[5].materialIndex = 3;\n" +
       "    faces[6].materialIndex = 4;\n" +
       "    faces[7].materialIndex = 4;\n" +
       "    faces[8].materialIndex = 3;\n" +
       "\n" +
       "    faces[9].materialIndex = 0;\n" +
       "    faces[10].materialIndex = 0;\n" +
       "    faces[11].materialIndex = 1;\n" +
       "    faces[12].materialIndex = 1;\n" +
       "    faces[13].materialIndex = 3;\n" +
       "    faces[14].materialIndex = 3;\n" +
       "    faces[15].materialIndex = 2;\n" +
       "    faces[16].materialIndex = 2;\n" +
       "\n" +
       "    faces[17].materialIndex = 1;\n" +
       "    faces[18].materialIndex = 1;\n" +
       "    faces[19].materialIndex = 3;\n" +
       "    faces[20].materialIndex = 3;\n" +
       "    faces[21].materialIndex = 2;\n" +
       "    faces[22].materialIndex = 2;\n" +
       "    faces[23].materialIndex = 4;\n" +
       "    faces[24].materialIndex = 4;\n" +
       "\n" +
       "    faces[25].materialIndex = 3;\n" +
       "    faces[26].materialIndex = 3;\n" +
       "\n" +
       "    faces[27].materialIndex = 0;\n" +
       "    faces[28].materialIndex = 0;\n" +
       "    faces[29].materialIndex = 3;\n" +
       "    faces[30].materialIndex = 3;\n" +
       "\n" +
       "    faces[31].materialIndex = 0;\n" +
       "    faces[32].materialIndex = 1;\n" +
       "    faces[33].materialIndex = 1;\n" +
       "    faces[34].materialIndex = 2;\n" +
       "    faces[35].materialIndex = 2;\n" +
       "    faces[36].materialIndex = 3;\n" +
       "    faces[37].materialIndex = 4;\n" +
       "    faces[38].materialIndex = 4;\n" +
       "    faces[39].materialIndex = 3;\n" +
       "\n" +
       "    this.faces = faces;\n" +
       "}})();\n";

        var AxialGeometry = eval(context.AxialGeometryText);
        AxialGeometry.prototype = Object.create( THREE.Geometry.prototype );
        context.logo = new THREE.Mesh(
            new AxialGeometry(1),
            new THREE.MeshFaceMaterial([
                new THREE.MeshBasicMaterial({ color: 0xa91216, side: THREE.DoubleSide}),
                new THREE.MeshBasicMaterial({ color: 0xde0d0d, side: THREE.DoubleSide}),
                new THREE.MeshBasicMaterial({ color: 0x11489f, side: THREE.DoubleSide}),
                new THREE.MeshBasicMaterial({ color: 0x093b7a, side: THREE.DoubleSide}),
                new THREE.MeshBasicMaterial({ color: 0x19171b, side: THREE.DoubleSide})
            ])
        );

        var labelMaterials = {black: new THREE.MeshBasicMaterial({color: 0x000000}),
                              white: new THREE.MeshBasicMaterial({color: 0xffffff})};
        var labelMaker = function (label, material) {
            var geo = new THREE.TextGeometry(label, {
                size: 0.1,
                height: 0.01,
                curveSegments: 4,
                font: "helvetiker",
                weight: "bold",
                style: "normal"
            });
            var mesh = new THREE.Mesh(geo, labelMaterials[material]);
            geo.computeBoundingBox();
            mesh.position.copy(geo.boundingBox.max).sub(geo.boundingBox.min).multiplyScalar(-0.5);
            return mesh;
        };

        context.logo.geometry.computeBoundingBox();
        context.logo.geometry.computeCentroids();
        context.logo.geometry.computeFaceNormals();
        var logoCenter = context.logo.geometry.boundingBox.max.clone().sub(context.logo.geometry.boundingBox.min).multiplyScalar(-0.5);
        context.logo.position.copy(logoCenter);
        context.logoWrapper = new THREE.Object3D();
        var white = new THREE.MeshBasicMaterial({color: 0xffffff});
        scene.add(context.logoWrapper);
        context.visualizeLogo = function () {
           if (context.progress < 61) {
                for (i = Math.max(0,context.progress - 1); i < Math.min(context.progress,22); i++) {
                    var dot = new THREE.Mesh(
                        new THREE.SphereGeometry(0.1),
                        white
                    );
                    dot.position.copy(context.logo.geometry.vertices[i]).add(logoCenter);
                    var dotLabel = labelMaker(i, 'black');
                    dotLabel.position.z = dotLabel.position.z + 0.1;
                    dot.add(dotLabel);
                    context.logoWrapper.add(dot);
                }
                if (context.progress >= 22) {
                    for (i = Math.max(0,context.progress - 23); i < context.progress - 22; i++) {
                        var face = context.logo.geometry.faces[i];
                        var vertices = context.logo.geometry.vertices;
                        var geometry = new THREE.Geometry();
                        geometry.vertices = [vertices[face.a].clone().add(logoCenter),
                                             vertices[face.b].clone().add(logoCenter),
                                             vertices[face.c].clone().add(logoCenter)];
                        geometry.faces = [ new THREE.Face3(0,1,2) ];
                        var triangle = new THREE.Mesh(
                           geometry,
                           context.logo.material.materials[face.materialIndex]
                        );
                        context.logoWrapper.add(triangle);
                    }
                }
            } else {
                for (var i = context.logoWrapper.children.length - 1; i >= 0; i--) {
                    context.logoWrapper.remove(context.logoWrapper.children[i]);
                }
                context.logoWrapper.add(context.logo);
                var spin = function() {
                    new TWEEN.Tween(context.logoWrapper.rotation)
                             .to({ y: context.logoWrapper.rotation.y - 2*Math.PI }, 1500)
                             .start()
                             .onComplete(spin);
                }
                spin();
            }
        };

        scene.cameraControls.reset();
        scene.camera.position.set(0,5,12);
        context.progress = 0;
        return context;
    },
    finalizor: function() {
        dat.GUI.toggleHide();
        GLitter.hideInfo();
    },
    onKeydown: function(scanCode, context) {
        if (scanCode === 32) {
            if (context.start) {
                delete context.start;
            } else {
                context.start = new Date();
            }
            return true;
        }
        return;
    },
    updator: function (context) {
        return function(scene) {
            if (context.start) {
                var now = new Date();
                if (context.progress < 62 && now - context.start > 1000) {
                    context.progress = context.progress + 1;
                    context.visualizeLogo();
                    context.start = now;

                    var textLine;
                    if (context.progress <= 22) {
                        textLine = context.progress + 4;
                    } else {
                        textLine = context.progress + 7;
                    }
                    if (context.progress >= 61) {
                        GLitter.showInfo("Ta-da!<br>Now it's time for <b>you</b> to have fun.<br>"
                               + "<a href='http://threejs.org/'>three.js - threejs.org</a><br>"
                               + "<a href='http://www.chromeexperiments.com/webgl/'>Chrome WebGL Experiments - www.chromeexperiments.com/webgl/</a><br>"
                               + "<a href='https://www.shadertoy.com/'>Shadertoy - www.shadertoy.com</a><br>"
                        );
                    } else {
                        GLitter.showInfo(context.AxialGeometryText.split("\n").splice(0,textLine).join("\n"));
                    }
                }
            }
            return ! context.STOP;
        }
    },
    gui: function(scene, context) {
        dat.GUI.toggleHide();
    }
});
