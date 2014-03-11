window.addEventListener('load',
    function () {
        CubePage.nextPage = SpherePage;
        SpherePage.prevPage = CubePage;
        var scene = new GLitter.Scene({});
        scene.initialize();
        document.getElementById('content').appendChild(scene.domElement);
        scene.loadPage(CubePage);
    }
);
