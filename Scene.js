"use strict";
(function(){
    var Scene = function(options) {
        this.scene           = new THREE.Scene();
        this.jsonLoader      = new THREE.JSONLoader();
        this.fov             = options.fov             || 30;
        this.fullScreen      = options.fullScreen      || true;
        if (this.fullScreen) {
            this.width       = window.innerWidth - 3;
            this.height      = window.innerHeight - 3;
        } else {
            this.width       = options.width;
            this.height      = options.height;
        }
        this.near            = options.near            || 0.1;
        this.far             = options.far             || 1000;
        this.backgroundColor = options.backgroundColor || 0xbb3388;
        this.backgroundAlpha = options.backgroundAlpha || 0.8;
        this.shadowsEnabled  = options.shadowsEnabled  || true;
        if (options.animationControls) {
            this.animationControls = options.animationControls;
        } else if (typeof TWEEN !== 'undefined') {
            this.animationControls = TWEEN;
        }
        this.transitionTime  = options.transitionTime || 300;
        this.initialized     = false;
    };

    Scene.prototype.initialize = function() {
        var scope = this;

        if (!scope.initialized) {
            scope.renderer = new THREE.WebGLRenderer({antialias: true});
            scope.renderer.setClearColor(scope.backgroundColor, scope.backgroundAlpha);

            scope.camera = new THREE.PerspectiveCamera(
                scope.fov,
                scope.width / scope.height,
                scope.near,
                scope.far
            );

            scope.cameraControls = new THREE.OrbitControls(scope.camera, scope.renderer.domElement);
            scope.renderer.setSize(scope.width, scope.height);

            if (scope.fullScreen) {
                window.addEventListener(
                    'resize',
                    function() {
                        scope.width = window.innerWidth - 3;
                        scope.height = window.innerHeight - 3;
                        scope.camera.aspect = scope.width / scope.height;
                        scope.camera.updateProjectionMatrix();
                        scope.renderer.setSize(scope.width, scope.height);
                    },
                    false
                );
            }

            if (scope.shadowsEnabled) {
                scope.renderer.shadowMapEnabled = true;
                scope.renderer.shadowMapSoft = true;
            }

            scope.domElement = scope.renderer.domElement;

            scope.initialized = true;
        }

        return scope;
    };

    Scene.prototype.render = function(update) {
        var scope = this;
        function _render() {
            var continueRendering = true;
            if (update) {
                continueRendering = update(scope);
            }
            if (continueRendering) {
                if (scope.cameraControls && scope.cameraControls.enabled) {
                    scope.cameraControls.update();
                }
                if (scope.animationControls) {
                    scope.animationControls.update();
                }
                requestAnimationFrame(_render);
            } else {
                scope.rendering = false;
            }
            if (scope.composer) {
                scope.renderer.clear(); 
                scope.composer.render(); 
            } else {
                scope.renderer.render(scope.scene, scope.camera);
            }
        }
        scope.rendering = true;
        _render();
    };

    Scene.prototype.remove = function() {
        for (var i = 0, l = arguments.length; i<l; i++) {
            if (Array.isArray(arguments[i])) {
                for (var j = 0, m = arguments[i].length; j<m; j++) {
                    this.scene.remove(arguments[i][j]);
                }
            } else {
                this.scene.remove(arguments[i]);
            }
        }
    };

    Scene.prototype.add = function() {
        for (var i = 0, l = arguments.length; i<l; i++) {
            if (Array.isArray(arguments[i])) {
                for (var j = 0, m = arguments[i].length; j<m; j++) {
                    this.scene.add(arguments[i][j]);
                }
            } else {
                this.scene.add(arguments[i]);
            }
        }
    };

    Scene.prototype.loadPage = function(page) {
        for (var i = this.scene.children.length - 1;
             i >= 0;
             i--) {
            this.scene.remove(this.scene.children[i]);
        }
        this.renderer.render(this.scene, this.camera);
        if (this.gui) {
            this.gui.destroy();
        }
        if (typeof dat !== 'undefined') {
            this.gui = new dat.GUI();
        }
        var update = page.load(this);
        this.render(update);
    };

    Scene.prototype.installTransitionComposer = function() {
        var scope = this;

        var renderModel = new THREE.RenderPass(scope.scene, scope.camera);
        renderModel.renderToScreen = false;
        scope.composer = new THREE.EffectComposer(scope.renderer);
        scope.composer.addPass(renderModel);

        var verticalEffect = new THREE.ShaderPass(THREE.VerticalBlurShader);
        scope.composer.addPass(verticalEffect);

        var horizontalEffect = new THREE.ShaderPass(THREE.HorizontalBlurShader);
        scope.composer.addPass(horizontalEffect);

        var toScreen = new THREE.ShaderPass(THREE.CopyShader);
        toScreen.renderToScreen = true;
        scope.composer.addPass(toScreen);

        scope.transitionUpdate = function() {
            verticalEffect.uniforms['v'].value = Math.random() / 10.0;
            horizontalEffect.uniforms['h'].value = Math.random() / 10.0;
        };
    };

    Scene.prototype.uninstallTransitionComposer = function() {
        var scope = this;
        delete scope.composer;
        delete scope.transitionUpdate;
    };


    Scene.prototype.transitionPage = function(from, to, context) {
        var scope = this;
        if (scope.renderingFinishedId || scope.transitionTimerId) {
            window.clearInterval(scope.transitionTimerId);
            window.clearInterval(scope.renderingFinishedId);
        }

        scope.installTransitionComposer();

        var start = new Date();
        scope.transitionTimerId = window.setInterval(function(){
            if (new Date() - start > scope.transitionTime) {
                window.clearInterval(scope.transitionTimerId);
                scope.renderingFinishedId = window.setInterval(function(){
                    if (!scope.rendering) {
                        window.clearInterval(scope.renderingFinishedId);
                        scope.renderingFinishedId = undefined;
                        scope.uninstallTransitionComposer();
                        from.finalizor(scope, context);
                        scope.loadPage(to);
                    } else {
                        context.STOP = true;
                    }
                }, 25);
            } else {
                scope.transitionUpdate();
            }
        }, 25);
    };

    GLitter.Scene = Scene;
})();
