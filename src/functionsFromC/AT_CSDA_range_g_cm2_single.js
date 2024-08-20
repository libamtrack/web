export default function AT_CSDA_range_g_cm2_single(parameters) {
	let at_csda_range_g_cm2_single = Module.cwrap('AT_CSDA_range_g_cm2_single', 'number', ['number', 'number', 'number', 'number']);
    let at_e_mev_u_from_e_mev = Module.cwrap('AT_E_MeV_u_from_E_MeV', 'number', ['number', 'number']);
    let at_atomic_weight_from_particle_no = Module.cwrap('AT_atomic_weight_from_particle_no_single', 'number', ['number']);

	// we need here MeV to MeV/u

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.E_initial === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_initial IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_initial = parameters.E_initial;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.E_final === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_final IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_final = parameters.E_final;

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
	let result = at_csda_range_g_cm2_single(E_initial, E_final, particle_no, material_no);


	return result;
}