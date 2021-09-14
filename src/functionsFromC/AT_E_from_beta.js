export default function AT_E_from_beta(parameters) {
	let at_e_from_beta = Module.cwrap('AT_E_from_beta', 'number', ['number', 'array', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.n){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(!parameters.beta){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER beta IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let beta = parameters.beta;
	let betaData = new Float64Array(beta);
	let betaDataBytesNumber = betaData.length * betaData.BYTES_PER_ELEMENT;
	let betaDataPointer = Module._malloc(betaDataBytesNumber);
	let betaHeap = new Uint8Array(Module.HEAPF64.buffer, betaDataPointer, betaDataBytesNumber);
	betaHeap.set(new Uint8Array(betaData.buffer));

	/*********************OUTPUT ARRAY*******************************/
	let E_MeV_uReturnData = new Float64Array(new Array(n));
	let E_MeV_uReturnDataBytesNumber = E_MeV_uReturnData.length * E_MeV_uReturnData.BYTES_PER_ELEMENT;
	let E_MeV_uReturnDataPointer = Module._malloc(E_MeV_uReturnDataBytesNumber);
	let E_MeV_uReturnHeap = new Uint8Array(Module.HEAPF64.buffer, E_MeV_uReturnDataPointer, E_MeV_uReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_e_from_beta(n, betaHeap, E_MeV_uReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(E_MeV_uReturnHeap.buffer, E_MeV_uReturnHeap.byteOffset, E_MeV_uReturnData.length);

	return [].slice.call(resultFromArray);
}