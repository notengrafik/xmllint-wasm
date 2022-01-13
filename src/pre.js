
Module['preRun'] = function () {
	const inputFiles = Module['inputFiles'];
	inputFiles.forEach(function(inputFile) {
		FS.createDataFile('/', inputFile['fileName'], intArrayFromString(inputFile['contents']), true, true);
	});
};

// work-around for transitional EXPORT_ES6=1, roughly based on https://github.com/emscripten-core/emscripten/issues/11792
function patchedLocateFile(name, location) {
  return location + name;
}
Module['locateFile'] = patchedLocateFile;

(function() {
	Module['arguments'] = Module['args'];
})();
