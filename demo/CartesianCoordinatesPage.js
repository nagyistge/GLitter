"use strict";
var CartesianCoordinatesPage;
(function() {
    var _colors = {
        vectorA: 0x00ffff,
        vectorB: 0x0000ff,
        cross: 0xff00ff,
        sum: 0x00ff00,
        diff: 0xff0000
    };

    function decimalToHex(d, padding) {
        var hex = Number(d).toString(16);
        padding = typeof (padding) === "undefined" || padding === null ? padding = 2 : padding;

        while (hex.length < padding) {
            hex = "0" + hex;
        }

        return hex;
    }

    function _toggleVector(name, direction, start, length, context, scene) {
        if (context[name]) {
            scene.remove(context[name]);
            delete context[name];
            if (name !== 'cross' && name !== 'sum' && name !== 'diff') {
                if (context.cross) {
                    scene.remove(context.cross);
                    delete context.cross;
                }
                if (context.sum) {
                    scene.remove(context.sum);
                    delete context.sum;
                }
                if (context.diff) {
                    scene.remove(context.diff);
                    delete context.diff;
                }
            }
        } else {
            context.arrowDirections[name] = direction;
            context[name] = new THREE.ArrowHelper(
                    direction,
                    start,
                    length,
                    _colors[name]
            );
            scene.add(context[name]);
        }

        GLitter.showInfo(_vectorInfo(context));
    }

    function _vectorInfo(context) {
        var info = '';
        var xAxis = new THREE.Vector3(1,0,0);
        var yAxis = new THREE.Vector3(0,1,0);
        var zAxis = new THREE.Vector3(0,0,1);
        for (var name in _colors) {
            if (context[name]) {
                 var dir = context.arrowDirections[name];
                 info = info + '<div style="color: #' + decimalToHex(_colors[name],6) + '">'
                      + name + ": " + dir.dot(xAxis) + ", " + dir.dot(yAxis) + ", " + dir.dot(zAxis)
                      + '</div>';
            }
        }

        return info;
    }

    CartesianCoordinatesPage = new GLitter.Page({
        title: "Cartesian Coordinates",
        initializor: function (scene) {
            var labelMaterial = new THREE.MeshFaceMaterial( [ 
                new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.FlatShading } ), // front
                new THREE.MeshPhongMaterial( { color: 0xffffff, shading: THREE.SmoothShading } ) // side
            ] );
            var labelMaker = function (label) {
                var geo = new THREE.TextGeometry( label, {
                    size: 0.4,
                    height: 0.1,
                    curveSegments: 4,
                    font: "helvetiker",
                    weight: "bold",
                    style: "normal",
                    material: 0,
                    extrudeMaterial: 1
                });
                var mesh = new THREE.Mesh(geo, labelMaterial);
                geo.computeBoundingBox();
                mesh.position.copy(geo.boundingBox.max).sub(geo.boundingBox.min).multiplyScalar(-0.5);
                return mesh;
            };
            var axisMaker = function(dir) {
                return new THREE.ArrowHelper(dir,new THREE.Vector3(0,0,0),0.7,0xffff00);
            };
            var x = labelMaker("X");
            var y = labelMaker("Y");
            var z = labelMaker("Z");
            x.position.x = x.position.x + 0.9;
            y.position.y = y.position.y + 1;
            z.position.z = z.position.z + 0.8;
            var coords = new THREE.Object3D();
            coords.add(x);
            coords.add(y);
            coords.add(z);
            var xAxis = axisMaker(new THREE.Vector3(1,0,0));
            coords.add(xAxis);

            var yAxis = axisMaker(new THREE.Vector3(0,1,0));
            coords.add(yAxis);

            var zAxis = axisMaker(new THREE.Vector3(0,0,1));
            coords.add(zAxis);

            scene.add(new THREE.AmbientLight(0x556677));
            var pointLight = new THREE.PointLight(0xffffff, 1, 100);
            pointLight.position.set(0,0,50);
            scene.add(pointLight);

            var origin = new THREE.Mesh(
                new THREE.SphereGeometry(0.05,16,12),
                new THREE.MeshBasicMaterial()
            );
            coords.add(origin);

            coords.rotation.y = -Math.PI / 4;
            scene.add(coords);
            scene.cameraControls.reset();
            scene.camera.position.set(0,3,5);
            return { coords: coords, arrowDirections: {} };
        },
        finalizor: function() {
            dat.GUI.toggleHide();
            GLitter.hideInfo();
        },
        onKeydown: function(scanCode, context, scene) {
            var dir;
            if (scanCode === 65 || scanCode === 97) { // "a" or "A"
                dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
                _toggleVector('vectorA', dir, new THREE.Vector3(), 1.0, context, scene);
            } else if (scanCode === 66 || scanCode === 98) { // "b" or "B"
                dir = new THREE.Vector3(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).normalize();
                _toggleVector('vectorB', dir, new THREE.Vector3(), 1.0, context, scene);
            } else if (scanCode === 68 || scanCode === 100) { // "d" or "D"
                if (context.vectorA && context.vectorB) {
                    var diff = context.arrowDirections.vectorB.clone().sub(context.arrowDirections.vectorA);
                    var diffLen = diff.length();
                    diff.normalize();
                    _toggleVector('diff', diff, context.arrowDirections.vectorA, diffLen, context, scene);
                }
            } else if (scanCode === 83 || scanCode === 115) { // "s" or "S"
                if (context.vectorA && context.vectorB) {
                    _toggleVector('sum', context.arrowDirections.vectorB, context.arrowDirections.vectorA, 1.0, context, scene);
                }
            } else if (scanCode === 88 || scanCode === 120) { // "x" or "X"
                if (context.vectorA && context.vectorB) {
                    var cross = context.arrowDirections.vectorA.clone().cross(context.arrowDirections.vectorB).normalize();
                    _toggleVector('cross', cross, new THREE.Vector3(), 1.0, context, scene);
                }
            }
        },
        updator: function (context) {
            return function(scene) {
                var now = new Date();
                if (context.SPIN) {
                    context.coords.rotation.y = context.SPIN_start + (context.SPIN - now) / 100;
                    if (now - context.SPIN > 400*Math.PI) {
                        context.coords.rotation.y = context.SPIN_start;
                        context.SPIN = undefined;
                    }
                } else if (Math.random() < 0.001) {
                    context.SPIN = now;
                    context.SPIN_start = context.coords.rotation.y;
                }
                return ! context.STOP;
            }
        },
        gui: function(scene, context) {
            dat.GUI.toggleHide();
        }
    });
})();
