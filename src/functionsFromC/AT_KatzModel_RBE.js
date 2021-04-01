export default function AT_KatzModel_RBE(parameters) {
	let at_katzmodel_rbe = Module.cwrap('AT_KatzModel_RBE', 'number', ['number', 'array', 'number', 'number', 'number', 'number', 'number', 'number', 'number', 'undefined', 'number', 'number', 'number']);

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

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.particle_no === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.m === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER m IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let m = parameters.m;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.D0_Gy === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER D0_Gy IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let D0_Gy = parameters.D0_Gy;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.sigma0_um2 === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER sigma0_um2 IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let sigma0_um2 = parameters.sigma0_um2;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.kappa === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER kappa IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let kappa = parameters.kappa;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.a0_um === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER a0_um IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let a0_um = parameters.a0_um;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.katz_model_flavour === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER katz_model_flavour IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let katz_model_flavour = parameters.katz_model_flavour;

	/*********************STANDARD PARAMETER*************************/
	let approximate = 1;

	/*********************STANDARD PARAMETER*************************/
	let stopping_power_source_no = 2;  // PSTAR

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.level === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER level IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let level = parameters.level;

	/*********************OUTPUT ARRAY*******************************/
	let rbeReturnData = new Float64Array(new Array(n));
	let rbeReturnDataBytesNumber = rbeReturnData.length * rbeReturnData.BYTES_PER_ELEMENT;
	let rbeReturnDataPointer = Module._malloc(rbeReturnDataBytesNumber);
	let rbeReturnHeap = new Uint8Array(Module.HEAPF64.buffer, rbeReturnDataPointer, rbeReturnDataBytesNumber);

	/*********************CALL FUNCTION******************************/
	let result = at_katzmodel_rbe(n, E_MeV_uHeap, particle_no, m, D0_Gy, sigma0_um2, kappa, a0_um, katz_model_flavour, approximate, stopping_power_source_no, level, rbeReturnHeap.byteOffset);
	let resultFromArray = new Float64Array(rbeReturnHeap.buffer, rbeReturnHeap.byteOffset, rbeReturnData.length);

	Module._free(E_MeV_uHeap.byteOffset);
	Module._free(rbeReturnHeap.byteOffset);

	return [].slice.call(resultFromArray);
}