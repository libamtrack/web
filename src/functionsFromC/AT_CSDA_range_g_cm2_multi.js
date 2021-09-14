export default function AT_CSDA_range_g_cm2_multi(parameters) {
	let at_csda_range_g_cm2_multi = Module.cwrap('AT_CSDA_range_g_cm2_multi', 'null', ['number', 'array', 'array', 'array', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if (typeof parameters.n === "undefined") {
		alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if (typeof parameters.E_initial_MeV_u === "undefined") {
		alert("MESSAGE TO DEVELOPER: NO PARAMETER E_initial_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		return "error";
	}
	let E_initial_MeV_u = parameters.E_initial_MeV_u;
	let E_initial_MeV_uData = new Float64Array(E_initial_MeV_u);
	let E_initial_MeV_uDataBytesNumber = E_initial_MeV_uData.length * E_initial_MeV_uData.BYTES_PER_ELEMENT;
	let E_initial_MeV_uDataPointer = Module._malloc(E_initial_MeV_uDataBytesNumber);
	let E_initial_MeV_uHeap = new Uint8Array(Module.HEAPF64.buffer, E_initial_MeV_uDataPointer, E_initial_MeV_uDataBytesNumber);
	E_initial_MeV_uHeap.set(new Uint8Array(E_initial_MeV_uData.buffer));

	/*********************INPUT ARRAY********************************/
	if (typeof parameters.particle_no === "undefined") {
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
	if (typeof parameters.material_no === "undefined") {
		alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		return "error";
	}
	let material_no = parameters.material_no;

	/*********************OUTPUT ARRAY*******************************/
	let CSDA_range_g_cm2ReturnData = new Float64Array(new Array(n));
	let CSDA_range_g_cm2ReturnDataBytesNumber = CSDA_range_g_cm2ReturnData.length * CSDA_range_g_cm2ReturnData.BYTES_PER_ELEMENT;
	let CSDA_range_g_cm2ReturnDataPointer = Module._malloc(CSDA_range_g_cm2ReturnDataBytesNumber);
	let CSDA_range_g_cm2ReturnHeap = new Uint8Array(Module.HEAPF64.buffer, CSDA_range_g_cm2ReturnDataPointer, CSDA_range_g_cm2ReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/

	// calculate CSDA range for completely slowing down ions
	let E_final_MeV_uData = new Float64Array(n);
	for (let i = 0; i < E_final_MeV_uData.length; i++) {
		E_final_MeV_uData[i] = 0.0;
	}

	let result = at_csda_range_g_cm2_multi(n, E_initial_MeV_uHeap, E_final_MeV_uData, particle_noHeap, material_no, CSDA_range_g_cm2ReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(CSDA_range_g_cm2ReturnHeap.buffer, CSDA_range_g_cm2ReturnHeap.byteOffset, CSDA_range_g_cm2ReturnData.length);

	Module._free(E_initial_MeV_uHeap.byteOffset);
	Module._free(E_final_MeV_uHeap.byteOffset);
	Module._free(particle_noHeap.byteOffset);
	Module._free(CSDA_range_g_cm2ReturnHeap.byteOffset);

	return [].slice.call(resultFromArray);
}