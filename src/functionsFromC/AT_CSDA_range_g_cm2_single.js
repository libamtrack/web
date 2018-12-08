export default function AT_CSDA_range_g_cm2_single(parameters) {
	let at_csda_range_g_cm2_single = Module.cwrap('AT_CSDA_range_g_cm2_single', 'number', ['number', 'number', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.E_initial_MeV_u === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_initial_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_initial_MeV_u = parameters.E_initial_MeV_u;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.E_final_MeV_u === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_final_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_final_MeV_u = parameters.E_final_MeV_u;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.particle_no === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.material_no === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************CALL FUNCTION******************************/
	let result = at_csda_range_g_cm2_single(E_initial_MeV_u, E_final_MeV_u, particle_no, material_no);


	return result;
}