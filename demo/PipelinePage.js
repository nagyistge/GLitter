"use strict";
var PipelinePage = new GLitter.Page({
    title: "OpenGL Pipeline",
    initializor: function (scene) {
        var context = {};
        var i, l;
        var programmableStepMaterial = new THREE.MeshBasicMaterial({color: 0x044598});
        var fixedStepMaterial = new THREE.MeshBasicMaterial({color: 0x984504});
        var whiteMaterial = new THREE.MeshBasicMaterial({color: 0xffffff});
        var wireframeMaterial = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true});
        var labelMaterial = new THREE.MeshFaceMaterial([
            whiteMaterial,
            whiteMaterial
        ]);
        var nextX = 0;
        var stepMargin = 0.4;
        function makeStep(text, programmable, example) {
            var label = new THREE.Mesh(
                new THREE.TextGeometry(
                    text,
                    { size: 0.1, height: 0.01, curveSegments: 4, font: "helvetiker", weight: "bold", style:"normal", material: 0, extrudeMaterial: 1 }
                ),
                labelMaterial
            );
            label.geometry.computeBoundingBox();
            var labelWidth = label.geometry.boundingBox.max.x - label.geometry.boundingBox.min.x;
            var labelHeight = label.geometry.boundingBox.max.y - label.geometry.boundingBox.min.y;
            label.position.x = -0.5 * labelWidth;
            label.position.y = -0.5 * labelHeight;
            var step = new THREE.Mesh(new THREE.BoxGeometry(labelWidth * 1.2,0.5,0.01),
                                      programmable ? programmableStepMaterial : fixedStepMaterial);
            step.add(label);

            if (example) {
                step.example = example;
                step.add(example);
            }

            step.geometry.computeBoundingBox();
            var stepWidth = step.geometry.boundingBox.max.x - step.geometry.boundingBox.min.x;
            step.position.x = nextX + stepWidth / 2;
            nextX = nextX + stepWidth + stepMargin;
            return step;
        }

        var tesselationExample = new THREE.Object3D();
        var tesselation1 = new THREE.Mesh(
            new THREE.BoxGeometry(0.1,0.1,0.1,1,1,1),
            wireframeMaterial
        );
        tesselation1.position.set(-0.2, -0.15, 0.06);
        var tesselation2 = new THREE.Mesh(
            new THREE.BoxGeometry(0.1,0.1,0.1,10,10,10),
            wireframeMaterial
        );
        tesselation2.position.set(0.2, -0.15, 0.06);

        tesselationExample.add(tesselation1);
        tesselationExample.add(tesselation2);
        tesselation1.geometry.computeBoundingBox();
        tesselation2.geometry.computeBoundingBox();
        var tesselationStart = tesselation1.position.clone();
        tesselationStart.x = tesselationStart.x + tesselation1.geometry.width / 2;
        var tesselationArrow = new THREE.ArrowHelper(
            new THREE.Vector3(1,0,0),
            tesselationStart,
            0.4 - (tesselation2.geometry.width + tesselation1.geometry.width) / 2,
            0xffffff
        );
        tesselationExample.add(tesselationArrow);

        var geometryExample = new THREE.Object3D();
        var triangleStrip = new THREE.Mesh(
            new THREE.PlaneGeometry(0.4,0.1,3,0),
            wireframeMaterial
        );
        triangleStrip.position.set(-0.4, -0.15, 0.1);
        triangleStrip.rotation.x = -Math.PI/3;
        geometryExample.add(triangleStrip);

        var triangleShape1 = new THREE.Shape();
        triangleShape1.moveTo(0,0);
        triangleShape1.lineTo(0,0.1);
        triangleShape1.lineTo(0.1,0.1);
        triangleShape1.lineTo(0,0);

        var triangleShape2 = new THREE.Shape();
        triangleShape2.moveTo(0,0);
        triangleShape2.lineTo(0.1,0);
        triangleShape2.lineTo(0.1,0.1);
        triangleShape2.lineTo(0,0);

        function _addTriangle(shape,x,y,z) {
            var triangle = new THREE.Mesh(
                new THREE.ShapeGeometry(shape),
                wireframeMaterial
            );
            geometryExample.add(triangle);
            triangle.position.set(x, y, z);
            triangle.rotation.x = -Math.PI/3;
        }
        _addTriangle(triangleShape1, 0.1, -0.15, 0.1);
        _addTriangle(triangleShape2, 0.17, -0.2, 0.1);
        _addTriangle(triangleShape1, 0.22, -0.15, 0.1);
        _addTriangle(triangleShape2, 0.29, -0.2, 0.1);
        _addTriangle(triangleShape1, 0.36, -0.15, 0.1);
        _addTriangle(triangleShape2, 0.43, -0.2, 0.1);

        var geometryArrow = new THREE.ArrowHelper(
            new THREE.Vector3(1,0,0),
            new THREE.Vector3(-0.175,-0.15,0.1),
            0.25,
            0xffffff
        );
        geometryExample.add(geometryArrow);

        var clippingExample = new THREE.Object3D()
        var clippingShape = new THREE.Shape();
        clippingShape.moveTo(0,0);
        clippingShape.lineTo(0.075,0);
        clippingShape.lineTo(0.075,0.05);
        clippingShape.lineTo(0.05,0.075);
        clippingShape.lineTo(0,0.075);
        clippingShape.lineTo(0,0);
        var clipObj = new THREE.Mesh(
            new THREE.ShapeGeometry(clippingShape),
            whiteMaterial
        );
        clipObj.position.set(-0.1, -0.2, 0.1);
        clipObj.rotation.z = Math.PI/4;
        clippingExample.add(clipObj);

        var clipBox = new THREE.Mesh(
            new THREE.BoxGeometry(0.1, 0.1, 0.1),
            wireframeMaterial
        );
        clipBox.position.set(-0.1, -0.16, 0.1);
        clippingExample.add(clipBox);

        var rasterizationTexture = THREE.ImageUtils.loadTexture("demo/rasterization.png");
        var rasterizationMaterial = new THREE.SpriteMaterial({
            map: rasterizationTexture,
            useScreenCoordinates: false,
            color: 0xffffff
        });
        var rasterizationSprite = new THREE.Sprite(rasterizationMaterial);
        rasterizationSprite.scale.set(0.2,0.2,0.2);
        rasterizationSprite.position.set(-0.2,-0.18,0.2);
        rasterizationSprite.visible = false;

        var fragmentTexture = THREE.ImageUtils.loadTexture("demo/fragment2.png");
        var fragmentMaterial = new THREE.SpriteMaterial({
            map: fragmentTexture,
            useScreenCoordinates: false,
            color: 0xffffff
        });
        var fragmentSprite = new THREE.Sprite(fragmentMaterial);
        fragmentSprite.scale.set(0.8,2.4,0.7);
        fragmentSprite.position.set(-0.2,-1.50,0.1);
        fragmentSprite.visible = false;

        context.steps = [
            makeStep("Vertex Shader", true),
            makeStep("Tesselation", true, tesselationExample),
            makeStep("Geometry Shader", true, geometryExample),
            makeStep("Clipping", false, clippingExample),
            makeStep("Rasterization", false, rasterizationSprite),
            makeStep("Fragment Shader", true, fragmentSprite),
            makeStep("Fragment Tests"),
            makeStep("Framebuffer Blending"),
            makeStep("Write Masking")
        ];

        context.stepWrapper = new THREE.Object3D();

        for (i = 0, l = context.steps.length; i < l; i++) {
            context.stepWrapper.add(context.steps[i]);
        }

        var arrowDir = new THREE.Vector3(1,0,0);
        context.arrows = [];
        for (i = 0, l = context.steps.length - 1; i < l; i++) {
            var arrowStart = context.steps[i].position.clone();
            arrowStart.x = arrowStart.x + context.steps[i].geometry.width/2 + 0.01;
            var arrow = new THREE.ArrowHelper(arrowDir, arrowStart, stepMargin - 0.02, 0xffffff, 0.08, 0.03);
            context.arrows.push(arrow);
        }

        for (i = 0, l = context.arrows.length; i < l; i++) {
            context.stepWrapper.add(context.arrows[i]);
        }

        context.curStep = 0;
        context.stepWrapper.position.x = -context.steps[0].position.x;

        // add vertexes before first step
        var vertexData = new THREE.Object3D();
        var vertexes = [
            new THREE.Mesh(new THREE.SphereGeometry(0.02), new THREE.MeshBasicMaterial({color:0xff2222})),
            new THREE.Mesh(new THREE.SphereGeometry(0.02), new THREE.MeshBasicMaterial({color:0x22ff22})),
            new THREE.Mesh(new THREE.SphereGeometry(0.02), new THREE.MeshBasicMaterial({color:0x2222ff})),
            new THREE.Mesh(new THREE.SphereGeometry(0.02), new THREE.MeshBasicMaterial({color:0xff22ff})),
            new THREE.Mesh(new THREE.SphereGeometry(0.02), new THREE.MeshBasicMaterial({color:0xffff22}))
        ];
        vertexData.position.x = -0.3;
        for (i = 0, l = vertexes.length; i < l; i++) {
            vertexes[i].position.set((Math.random() - 0.5) / 4, (Math.random() - 0.5) / 4, 0);
            vertexData.add(vertexes[i]);
            var arrowDir = context.steps[0].position.clone();
            arrowDir.y = vertexes[i].position.y;
            arrowDir.sub(vertexes[i].position);
            var arrowLen = context.steps[0].position.x - vertexes[i].position.x - 0.25;
            vertexData.add(new THREE.ArrowHelper(arrowDir.normalize(), vertexes[i].position, arrowLen, vertexes[i].material.color, 0.04, 0.01));
        }
        context.stepWrapper.add(vertexData);

        scene.add(context.stepWrapper);

        scene.add(new THREE.AmbientLight({color:0x444444}));

        scene.cameraControls.reset();
        scene.cameraControls.update();
        scene.camera.position.set(-1.5,0.01,1.2);
        scene.camera.rotation.set(0.01,-0.7,0.01);

        return context;
    },
    onKeydown: function(scanCode, context) {
        if (scanCode === 32) {
            context.curStep = (context.curStep + 1) % context.steps.length;
            var nextStep = context.steps[context.curStep];
            new TWEEN.Tween( context.stepWrapper.position ).to(
                { x: -nextStep.position.x }, 1000
            ).easing( TWEEN.Easing.Cubic.InOut )
             .onComplete(function(){
                 if (nextStep.example) {
                     nextStep.example.visible = true;
                 }
             }).start();

            return true;
        }
    },
    finalizor: function(scene, context) {
    },
    updator: function (context) {
        return function(scene) {
            return ! context.STOP;
        }
    },
    gui: function(scene, context) {
    }
});
