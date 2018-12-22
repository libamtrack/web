export default function AT_CSDA_energy_after_slab_E_MeV_u_multi(parameters) {
	let at_csda_energy_after_slab_e_mev_u_multi = Module.cwrap('AT_CSDA_energy_after_slab_E_MeV_u_multi', 'null', ['number', 'array', 'array', 'number', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.n === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let n = parameters.n;

	/*********************INPUT ARRAY********************************/
	if(typeof parameters.E_initial_MeV_u === "undefined"){
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

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.material_no === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.slab_thickness_cm === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER slab_thickness_cm IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	// convertin from user friendly [cm] to [m] required by libamtrack
	let slab_thickness_m = 0.01 * parameters.slab_thickness_cm;

	/*********************OUTPUT ARRAY*******************************/
	let E_final_MeV_uReturnData = new Float64Array(new Array(n));
	let E_final_MeV_uReturnDataBytesNumber = E_final_MeV_uReturnData.length * E_final_MeV_uReturnData.BYTES_PER_ELEMENT;
	let E_final_MeV_uReturnDataPointer = Module._malloc(E_final_MeV_uReturnDataBytesNumber);
	let E_final_MeV_uReturnHeap = new Uint8Array(Module.HEAPF64.buffer, E_final_MeV_uReturnDataPointer, E_final_MeV_uReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_csda_energy_after_slab_e_mev_u_multi(n, E_initial_MeV_uHeap, particle_noHeap, material_no, slab_thickness_m, E_final_MeV_uReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(E_final_MeV_uReturnHeap.buffer, E_final_MeV_uReturnHeap.byteOffset, E_final_MeV_uReturnData.length);

	Module._free(E_initial_MeV_uHeap.byteOffset);
	Module._free(particle_noHeap.byteOffset);
	Module._free(E_final_MeV_uReturnHeap.byteOffset);

	return [].slice.call(resultFromArray);
}