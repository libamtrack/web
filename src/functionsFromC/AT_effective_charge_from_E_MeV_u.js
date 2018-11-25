export default function AT_effective_charge_from_E_MeV_u(parameters) {
	let at_effective_charge_from_e_mev_u = Module.cwrap('AT_effective_charge_from_E_MeV_u', 'number', ['number', 'array', 'array', 'number']);

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

	/*********************INPUT ARRAY********************************/
	if(!parameters.particle_no){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;
	let particle_noData = new Int32Array(particle_no);
	let particle_noDataBytesNumber = particle_noData.length * particle_noData.BYTES_PER_ELEMENT;
	let particle_noDataPointer = Module._malloc(particle_noDataBytesNumber);
	let particle_noHeap = new Uint8Array(Module.HEAP32.buffer, particle_noDataPointer, particle_noDataBytesNumber);
	particle_noHeap.set(new Uint8Array(particle_noData.buffer));

	/*********************OUTPUT ARRAY*******************************/
	let effective_chargeReturnData = new Float64Array(new Array(n));
	let effective_chargeReturnDataBytesNumber = effective_chargeReturnData.length * effective_chargeReturnData.BYTES_PER_ELEMENT;
	let effective_chargeReturnDataPointer = Module._malloc(effective_chargeReturnDataBytesNumber);
	let effective_chargeReturnHeap = new Uint8Array(Module.HEAPF64.buffer, effective_chargeReturnDataPointer, effective_chargeReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_effective_charge_from_e_mev_u(n, E_MeV_uHeap, particle_noHeap, effective_chargeReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(effective_chargeReturnHeap.buffer, effective_chargeReturnHeap.byteOffset, effective_chargeReturnData.length);

	Module._free(E_MeV_uHeap.byteOffset);
	Module._free(particle_noHeap.byteOffset);
	Module._free(effective_chargeReturnHeap.byteOffset);

	return [].slice.call(resultFromArray);
}