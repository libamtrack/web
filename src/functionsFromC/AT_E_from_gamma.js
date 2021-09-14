export default function AT_E_from_gamma(parameters) {
	let at_e_from_gamma = Module.cwrap('AT_E_from_gamma', 'number', ['number', 'array', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.n){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(!parameters.gamma){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER gamma IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let gamma = parameters.gamma;
	let gammaData = new Float64Array(gamma);
	let gammaDataBytesNumber = gammaData.length * gammaData.BYTES_PER_ELEMENT;
	let gammaDataPointer = Module._malloc(gammaDataBytesNumber);
	let gammaHeap = new Uint8Array(Module.HEAPF64.buffer, gammaDataPointer, gammaDataBytesNumber);
	gammaHeap.set(new Uint8Array(gammaData.buffer));

	/*********************OUTPUT ARRAY*******************************/
	let E_MeV_uReturnData = new Float64Array(new Array(n));
	let E_MeV_uReturnDataBytesNumber = E_MeV_uReturnData.length * E_MeV_uReturnData.BYTES_PER_ELEMENT;
	let E_MeV_uReturnDataPointer = Module._malloc(E_MeV_uReturnDataBytesNumber);
	let E_MeV_uReturnHeap = new Uint8Array(Module.HEAPF64.buffer, E_MeV_uReturnDataPointer, E_MeV_uReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_e_from_gamma(n, gammaHeap, E_MeV_uReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(E_MeV_uReturnHeap.buffer, E_MeV_uReturnHeap.byteOffset, E_MeV_uReturnData.length);

	return [].slice.call(resultFromArray);
}