var GLitter = {
    showInfo: function (content) {
        var info = document.getElementById('info');
        info.innerHTML = content;
        info.style.display = 'block';
    },
    hideInfo: function (content) {
        var info = document.getElementById('info');
        info.style.display = 'none';
    },
    toggleInfo: function (content) {
        var info = document.getElementById('info');
        if (info.style.display == 'block') {
            info.style.display = 'none';
        } else {
            info.style.display = 'block';
        }
    },
    matrix2html: function (matrix) {
        function fmt(e) { var s = e.toFixed(2); if (s.substr(0,1) != '-') { s = ' ' + s } return s }
        return "<div class='matrix'>" +
            fmt(matrix.elements[0]) + " " + fmt(matrix.elements[4]) + " " + fmt(matrix.elements[8]) + " " + fmt(matrix.elements[12]) + "<br>" +
            fmt(matrix.elements[1]) + " " + fmt(matrix.elements[5]) + " " + fmt(matrix.elements[9]) + " " + fmt(matrix.elements[13]) + "<br>" +
            fmt(matrix.elements[2]) + " " + fmt(matrix.elements[6]) + " " + fmt(matrix.elements[10]) + " " + fmt(matrix.elements[14]) + "<br>" +
            fmt(matrix.elements[3]) + " " + fmt(matrix.elements[7]) + " " + fmt(matrix.elements[11]) + " " + fmt(matrix.elements[15]) +
        "</div>";
    }
};
