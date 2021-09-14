export default function AT_beta_from_E(parameters) {
	let at_beta_from_e = Module.cwrap('AT_beta_from_E', 'number', ['number', 'array', 'number']);

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
	let betaReturnData = new Float64Array(new Array(n));
	let betaReturnDataBytesNumber = betaReturnData.length * betaReturnData.BYTES_PER_ELEMENT;
	let betaReturnDataPointer = Module._malloc(betaReturnDataBytesNumber);
	let betaReturnHeap = new Uint8Array(Module.HEAPF64.buffer, betaReturnDataPointer, betaReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_beta_from_e(n, E_MeV_uHeap, betaReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(betaReturnHeap.buffer, betaReturnHeap.byteOffset, betaReturnData.length);

	return [].slice.call(resultFromArray);
}