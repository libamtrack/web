export default function AT_Stopping_Power_with_no(parameters) {
	let at_stopping_power_with_no = Module.cwrap('AT_Stopping_Power_with_no', 'number', ['number', 'number', 'array', 'array', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.stopping_power_source_no === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER stopping_power_source_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let stopping_power_source_no = parameters.stopping_power_source_no;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.n === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(typeof parameters.E_MeV_u === undefined){
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
	if(typeof parameters.particle_no === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;
	let particle_noData = new Int32Array(particle_no);
	let particle_noDataBytesNumber = particle_noData.length * particle_noData.BYTES_PER_ELEMENT;
	let particle_noDataPointer = Module._malloc(particle_noDataBytesNumber);
	let particle_noHeap = new Uint8Array(Module.HEAP32.buffer, particle_noDataPointer, particle_noDataBytesNumber);
	particle_noHeap.set(new Uint8Array(particle_noData.buffer));

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.material_no === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************OUTPUT ARRAY*******************************/
	let stopping_power_keV_umReturnData = new Float64Array(new Array(n));
	let stopping_power_keV_umReturnDataBytesNumber = stopping_power_keV_umReturnData.length * stopping_power_keV_umReturnData.BYTES_PER_ELEMENT;
	let stopping_power_keV_umReturnDataPointer = Module._malloc(stopping_power_keV_umReturnDataBytesNumber);
	let stopping_power_keV_umReturnHeap = new Uint8Array(Module.HEAPF64.buffer, stopping_power_keV_umReturnDataPointer, stopping_power_keV_umReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_stopping_power_with_no(stopping_power_source_no, n, E_MeV_uHeap, particle_noHeap, material_no, stopping_power_keV_umReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(stopping_power_keV_umReturnHeap.buffer, stopping_power_keV_umReturnHeap.byteOffset, stopping_power_keV_umReturnData.length);

	Module._free(E_MeV_uHeap.byteOffset);
	Module._free(particle_noHeap.byteOffset);
	Module._free(stopping_power_keV_umReturnHeap.byteOffset);

	return [].slice.call(resultFromArray);
}