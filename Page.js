"use strict";
(function(){
    var Page = function(options) {
        this.title = options.title || "";
        this.subtitle = options.subtitle || "";
        this.initializor = options.initializor || function(){ return {} };
        this.finalizor = options.finalizor || function(){ return };
        this.gui = options.gui || function(){};
        this.updator = options.updator || function(){ return true; };
        this.onKeydown = options.onKeydown;
        this.nextPage = options.nextPage;
    }

    Page.prototype.keydownHandlerFactory = function(scene, context, updator) {
        var scope = this;
        return function (ev) {
            if (scope.onKeydown) {
                if (scope.onKeydown(ev.keyCode, context, scene)) {
                    return;
                }
            }
            if (ev.keyCode === 80 || ev.keyCode === 112) { // "p" or "P"
                if (scope.prevPage) {
                    scene.transitionPage(scope, scope.prevPage, context);
                }
            } else if (ev.keyCode === 82 || ev.keyCode === 114) { // "r" or "R"
                scene.transitionPage(scope, scope, context);
            } else if (ev.keyCode === 78 || ev.keyCode === 110) { // "n" or "N"
                if (scope.nextPage) {
                    scene.transitionPage(scope, scope.nextPage, context);
                }
            } else if (ev.keyCode === 73 || ev.keyCode === 105) { // "i" or "I"
                toggleInfo();
            }

            if (context.STOP) {
                if (ev.keyCode === 13 || // ENTER
                    ev.keyCode === 32) { // SPACE
                    context.STOP = false; 
                    scene.render(updator);
                }
            } else {
                if (ev.keyCode === 13 || // ENTER
                    ev.keyCode === 32) { // SPACE
                    context.STOP = true; 
                }
            }
        };
    },

    Page.prototype.load = function (scene) {
        var scope = this,
            context = scope.initializor(scene),
            updator = scope.updator(context);
        
        // add title
        document.getElementById('title').innerHTML = scope.title;

        // add subtitle
        var subTitle = document.getElementById('subtitle');
        if (scope.subtitle) {
            subTitle.innerHTML = scope.subtitle;
        } else {
            subTitle.innerHTML = '';
        }

        // add gui
        scope.gui(scene, context);

        window.removeEventListener('keydown', scope.keydownHandler);
        scope.keydownHandler = scope.keydownHandlerFactory(scene, context, updator);
        window.addEventListener('keydown', scope.keydownHandler);

        return updator;
    };

    GLitter.Page = Page;
})();
