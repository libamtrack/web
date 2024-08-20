export default function AT_CSDA_range_g_cm2_single(parameters) {
	let at_csda_range_g_cm2_single = Module.cwrap('AT_CSDA_range_g_cm2_single', 'number', ['number', 'number', 'number', 'number']);
    let at_e_mev_u_from_e_mev = Module.cwrap('AT_E_MeV_u_from_E_MeV', 'number', ['number', 'number']);
    let at_density_g_cm3_from_material_no = Module.cwrap('AT_density_g_cm3_from_material_no', 'number', ['number']);

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

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.energy_unit === "undefined"){
		alert("MESSAGE TO DEVELOPER: NO PARAMETER energy_unit IN OBJECT PASSED TO THIS FUNCTIONS");
		return "error";
    }
    let energy_unit = parameters.energy_unit;

	let E_initial_MeV_u = E_initial;
	let E_final_MeV_u = E_final;
	if (energy_unit === 2) {
		E_initial_MeV_u = at_e_mev_u_from_e_mev(E_initial, particle_no);
		E_final_MeV_u = at_e_mev_u_from_e_mev(E_final, particle_no);
	}

	let density_g_cm3 = at_density_g_cm3_from_material_no(material_no);

	/*********************CALL FUNCTION******************************/
	let result_cm = at_csda_range_g_cm2_single(E_initial_MeV_u, E_final_MeV_u, particle_no, material_no);
	result_cm = result_cm / density_g_cm3;
	let result_mm = result_cm * 10;


	return result_mm;
}