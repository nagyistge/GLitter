window.addEventListener('load',
    function () {
        var PAGES = [IntroductionPage, CartesianCoordinatesPage, MeshesPage,
                      TransformationsPage, ProjectionsPage, LightingPage,
                      PipelinePage, AxialLogoPage];

        for (var i = 0, l = PAGES.length; i < l - 1; i++) {
            if (PAGES[i + 1]) {
                PAGES[i].nextPage = PAGES[i + 1];
                PAGES[i + 1].prevPage = PAGES[i];
            }
        }

        var scene = new GLitter.Scene({});
        scene.initialize();
        document.getElementById('content').appendChild(scene.domElement);
        scene.loadPage(PAGES[0]);
    }
);
