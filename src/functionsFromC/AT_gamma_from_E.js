export default function AT_gamma_from_E(parameters) {
	let at_gamma_from_e = Module.cwrap('AT_gamma_from_E', 'number', ['number', 'array', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.n){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(!parameters.E_MeV_u){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_MeV_u = parameters.E_MeV_u;
	let E_MeV_uData = new Float64Array(E_MeV_u);
	let E_MeV_uDataBytesNumber = E_MeV_uData.length * E_MeV_uData.BYTES_PER_ELEMENT;
	let E_MeV_uDataPointer = Module._malloc(E_MeV_uDataBytesNumber);
	let E_MeV_uHeap = new Uint8Array(Module.HEAPF64.buffer, E_MeV_uDataPointer, E_MeV_uDataBytesNumber);
	E_MeV_uHeap.set(new Uint8Array(E_MeV_uData.buffer));

	/*********************OUTPUT ARRAY*******************************/
	let gammaReturnData = new Float64Array(new Array(n));
	let gammaReturnDataBytesNumber = gammaReturnData.length * gammaReturnData.BYTES_PER_ELEMENT;
	let gammaReturnDataPointer = Module._malloc(gammaReturnDataBytesNumber);
	let gammaReturnHeap = new Uint8Array(Module.HEAPF64.buffer, gammaReturnDataPointer, gammaReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_gamma_from_e(n, E_MeV_uHeap, gammaReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(gammaReturnHeap.buffer, gammaReturnHeap.byteOffset, gammaReturnData.length);

	return [].slice.call(resultFromArray);
}