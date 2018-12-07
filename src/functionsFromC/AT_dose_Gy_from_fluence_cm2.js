export default function AT_dose_Gy_from_fluence_cm2(parameters) {
	let at_dose_gy_from_fluence_cm2 = Module.cwrap('AT_dose_Gy_from_fluence_cm2', 'null', ['number', 'array', 'array', 'array', 'number', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.n === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(typeof parameters.E_MeV_u === "undefined"){
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
	if(typeof parameters.particle_no === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;
	let particle_noData = new Int32Array(particle_no);
	let particle_noDataBytesNumber = particle_noData.length * particle_noData.BYTES_PER_ELEMENT;
	let particle_noDataPointer = Module._malloc(particle_noDataBytesNumber);
	let particle_noHeap = new Uint8Array(Module.HEAP32.buffer, particle_noDataPointer, particle_noDataBytesNumber);
	particle_noHeap.set(new Uint8Array(particle_noData.buffer));

	/*********************INPUT ARRAY********************************/
	if(typeof parameters.fluence_cm2 === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER fluence_cm2 IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let fluence_cm2 = parameters.fluence_cm2;
	let fluence_cm2Data = new Float64Array(fluence_cm2);
	let fluence_cm2DataBytesNumber = fluence_cm2Data.length * fluence_cm2Data.BYTES_PER_ELEMENT;
	let fluence_cm2DataPointer = Module._malloc(fluence_cm2DataBytesNumber);
	let fluence_cm2Heap = new Uint8Array(Module.HEAPF64.buffer, fluence_cm2DataPointer, fluence_cm2DataBytesNumber);
	fluence_cm2Heap.set(new Uint8Array(fluence_cm2Data.buffer));

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.material_no === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.stopping_power_source_no === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER stopping_power_source_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let stopping_power_source_no = parameters.stopping_power_source_no;

	/*********************OUTPUT ARRAY*******************************/
	let dose_GyReturnData = new Float64Array(new Array(n));
	let dose_GyReturnDataBytesNumber = dose_GyReturnData.length * dose_GyReturnData.BYTES_PER_ELEMENT;
	let dose_GyReturnDataPointer = Module._malloc(dose_GyReturnDataBytesNumber);
	let dose_GyReturnHeap = new Uint8Array(Module.HEAPF64.buffer, dose_GyReturnDataPointer, dose_GyReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_dose_gy_from_fluence_cm2(n, E_MeV_uHeap, particle_noHeap, fluence_cm2Heap, material_no, stopping_power_source_no, dose_GyReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(dose_GyReturnHeap.buffer, dose_GyReturnHeap.byteOffset, dose_GyReturnData.length);

	Module._free(E_MeV_uHeap.byteOffset);
	Module._free(particle_noHeap.byteOffset);
	Module._free(fluence_cm2Heap.byteOffset);
	Module._free(dose_GyReturnHeap.byteOffset);

	return [].slice.call(resultFromArray);
}