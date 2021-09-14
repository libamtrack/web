export default function AT_E_MeV_u_from_momentum_MeV_c_u(parameters) {
	let at_e_mev_u_from_momentum_mev_c_u = Module.cwrap('AT_E_MeV_u_from_momentum_MeV_c_u', 'number', ['number', 'array', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.n){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(!parameters.momentum_MeV_c_u){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER momentum_MeV_c_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let momentum_MeV_c_u = parameters.momentum_MeV_c_u;
	let momentum_MeV_c_uData = new Float64Array(momentum_MeV_c_u);
	let momentum_MeV_c_uDataBytesNumber = momentum_MeV_c_uData.length * momentum_MeV_c_uData.BYTES_PER_ELEMENT;
	let momentum_MeV_c_uDataPointer = Module._malloc(momentum_MeV_c_uDataBytesNumber);
	let momentum_MeV_c_uHeap = new Uint8Array(Module.HEAPF64.buffer, momentum_MeV_c_uDataPointer, momentum_MeV_c_uDataBytesNumber);
	momentum_MeV_c_uHeap.set(new Uint8Array(momentum_MeV_c_uData.buffer));

	/*********************OUTPUT ARRAY*******************************/
	let E_MeV_uReturnData = new Float64Array(new Array(n));
	let E_MeV_uReturnDataBytesNumber = E_MeV_uReturnData.length * E_MeV_uReturnData.BYTES_PER_ELEMENT;
	let E_MeV_uReturnDataPointer = Module._malloc(E_MeV_uReturnDataBytesNumber);
	let E_MeV_uReturnHeap = new Uint8Array(Module.HEAPF64.buffer, E_MeV_uReturnDataPointer, E_MeV_uReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_e_mev_u_from_momentum_mev_c_u(n, momentum_MeV_c_uHeap, E_MeV_uReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(E_MeV_uReturnHeap.buffer, E_MeV_uReturnHeap.byteOffset, E_MeV_uReturnData.length);

	return [].slice.call(resultFromArray);
}