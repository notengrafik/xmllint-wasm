const {workerData, parentPort} = require('worker_threads');

function stdout(txt) {
	parentPort.postMessage({isStdout: true, txt: txt});
}

function stderr(txt) {
	parentPort.postMessage({isStdout: false, txt: txt});
}

require('./xmllint.js')({
	stdout: stdout,
	stderr: stderr,
	inputFiles: workerData.inputFiles,
	args: workerData.args
});
