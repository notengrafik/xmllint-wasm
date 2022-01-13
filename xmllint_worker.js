
import { dirname } from 'path';
import { createRequire } from 'module';

// work-around for transitional EXPORT_ES6=1, roughly based on https://github.com/emscripten-core/emscripten/issues/11792
globalThis.__dirname = dirname(import.meta.url);
globalThis.require = createRequire(import.meta.url);
globalThis.importScripts = function() { };

import Xmllint from './xmllint.js';

import { workerData, parentPort } from 'worker_threads';

function stdout(txt) {
	parentPort.postMessage({isStdout: true, txt: txt});
}

function stderr(txt) {
	parentPort.postMessage({isStdout: false, txt: txt});
}

Xmllint({
	stdout: stdout,
	stderr: stderr,
	inputFiles: workerData.inputFiles,
	args: workerData.args
});
