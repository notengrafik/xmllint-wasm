
* `git submodule init`

* `git submodule update`

* `source /opt/emsdk/emsdk_env.sh` or whereever this is located on your machine

* `./script/clean`

* `./script/libxml2`

* `./script/compile`

* `./test_browser/run_http_server &` – beware the working directory, it defines the root of the http server!

* Open *http://localhost:8088/test_browser* in your browser.

* Open a web console.

* Push the button; you should see normalized XML on the console and an alert dialog for invalid XML.  See further test/test.js.
