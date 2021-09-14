export default function AT_Mass_Stopping_Power_with_no(parameters) {
	let at_mass_stopping_power_with_no = Module.cwrap('AT_Mass_Stopping_Power_with_no', 'number', ['number', 'number', 'array', 'array', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.stopping_power_source_no){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER stopping_power_source_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let stopping_power_source_no = parameters.stopping_power_source_no;

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

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.material_no){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************OUTPUT ARRAY*******************************/
	let stopping_power_MeV_cm2_gReturnData = new Float64Array(new Array(n));
	let stopping_power_MeV_cm2_gReturnDataBytesNumber = stopping_power_MeV_cm2_gReturnData.length * stopping_power_MeV_cm2_gReturnData.BYTES_PER_ELEMENT;
	let stopping_power_MeV_cm2_gReturnDataPointer = Module._malloc(stopping_power_MeV_cm2_gReturnDataBytesNumber);
	let stopping_power_MeV_cm2_gReturnHeap = new Uint8Array(Module.HEAPF64.buffer, stopping_power_MeV_cm2_gReturnDataPointer, stopping_power_MeV_cm2_gReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_mass_stopping_power_with_no(stopping_power_source_no, n, E_MeV_uHeap, particle_noHeap, material_no, stopping_power_MeV_cm2_gReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(stopping_power_MeV_cm2_gReturnHeap.buffer, stopping_power_MeV_cm2_gReturnHeap.byteOffset, stopping_power_MeV_cm2_gReturnData.length);

	return [].slice.call(resultFromArray);
}