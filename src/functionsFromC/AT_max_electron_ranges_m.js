export default function AT_max_electron_ranges_m(parameters) {
	let at_max_electron_ranges_m = Module.cwrap('AT_max_electron_ranges_m', 'null', ['number', 'array', 'number', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.n){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER number_of_particles IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let number_of_particles = parameters.n;

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

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.material_no){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.er_model){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER er_model IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let er_model = parameters.er_model;

	/*********************OUTPUT ARRAY*******************************/
	let max_electron_range_mReturnData = new Float64Array(new Array(number_of_particles));
	let max_electron_range_mReturnDataBytesNumber = max_electron_range_mReturnData.length * max_electron_range_mReturnData.BYTES_PER_ELEMENT;
	let max_electron_range_mReturnDataPointer = Module._malloc(max_electron_range_mReturnDataBytesNumber);
	let max_electron_range_mReturnHeap = new Uint8Array(Module.HEAPF64.buffer, max_electron_range_mReturnDataPointer, max_electron_range_mReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	/** convert units from [m] to [um] **/
	let result = at_max_electron_ranges_m(number_of_particles, E_MeV_uHeap, material_no, er_model, max_electron_range_mReturnHeap.byteOffset);
	let resultFromArray = (new Float64Array(max_electron_range_mReturnHeap.buffer, max_electron_range_mReturnHeap.byteOffset, max_electron_range_mReturnData.length)).map(function(x) { return x * 1e6; });;

	Module._free(E_MeV_uHeap.byteOffset);
	Module._free(max_electron_range_mReturnHeap.byteOffset);

	return [].slice.call(resultFromArray);
}