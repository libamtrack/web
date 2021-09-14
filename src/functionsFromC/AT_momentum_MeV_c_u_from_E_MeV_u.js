export default function AT_momentum_MeV_c_u_from_E_MeV_u(parameters) {
	let at_momentum_mev_c_u_from_e_mev_u = Module.cwrap('AT_momentum_MeV_c_u_from_E_MeV_u', 'number', ['number', 'array', 'number']);

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
	let momentum_MeV_cReturnData = new Float64Array(new Array(n));
	let momentum_MeV_cReturnDataBytesNumber = momentum_MeV_cReturnData.length * momentum_MeV_cReturnData.BYTES_PER_ELEMENT;
	let momentum_MeV_cReturnDataPointer = Module._malloc(momentum_MeV_cReturnDataBytesNumber);
	let momentum_MeV_cReturnHeap = new Uint8Array(Module.HEAPF64.buffer, momentum_MeV_cReturnDataPointer, momentum_MeV_cReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_momentum_mev_c_u_from_e_mev_u(n, E_MeV_uHeap, momentum_MeV_cReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(momentum_MeV_cReturnHeap.buffer, momentum_MeV_cReturnHeap.byteOffset, momentum_MeV_cReturnData.length);

	return [].slice.call(resultFromArray);
}