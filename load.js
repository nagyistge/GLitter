function load() {
    var i,
        expected = 0,
        loaded   = 0;

    // this is where we will attach the <script> tags
    var head = document.getElementsByTagName("head")[0] || document.documentElement;

    // initialize callback to noop
    var callback = null;

    // this wrapper invokes the callback when all scripts have finished loading
    var callback_wrapper = function(){
        loaded = loaded + 1;
        if (loaded >= expected && callback !== null) callback();
    };

    // this is the same thing, but for IE (IE does not support onload on scripts)
    var ie_callback_wrapper = function(){
        if (this.readyState === "loaded" || this.readyState === "complete") {
            loaded = loaded + 1;
        
            // avoid memory leak
            this.onreadystatechange = null;
            if (head && this.parentNode) head.removeChild(this);

            if (loaded >= expected && callback !== null) callback();
        }
    };

    for (i = 0; i < arguments.length; i++) {
        if (arguments[i] instanceof Function) {
            // argument is a callback to invoke after all scripts are loaded
            if (callback === null) {
                callback = arguments[i];
            } else {
                // allow multiple callbacks to be specified
                callback = (function(orig_callback, new_callback) {
                    return function() { orig_callback(); new_callback(); };
                })(callback, arguments[i]);
            }
        } else if (arguments[i] instanceof Array) {
            // an array means to invoke load recursively
            if (callback === null) {
                callback = (function(args) {
                    return function(){ load.apply(null, args) };
                })(arguments[i]);
            } else {
                // retain any existing callbacks
                callback = (function(orig_callback, args){
                    return function(){ orig_callback(); load.apply(null, args) };
                })(callback, arguments[i]);
            }
        } else {
            // create script tag and set src
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.async = true;
            script.src = arguments[i];

            if ('onreadystatechange' in script) {
                // IE
                script.onreadystatechange = ie_callback_wrapper;
            } else if ('onload' in script) {
                // chrome, firefox, etc.
                script.onload = callback_wrapper;
            }

            head.insertBefore(script, head.firstChild);

            expected = expected + 1;
        }
    }

    if (expected === 0 && callback !== null) callback();
}
