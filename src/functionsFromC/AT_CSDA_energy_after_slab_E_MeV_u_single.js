export default function AT_CSDA_energy_after_slab_E_MeV_u_single(parameters) {
	let at_csda_energy_after_slab_e_mev_u_single = Module.cwrap('AT_CSDA_energy_after_slab_E_MeV_u_single', 'number', ['number', 'number', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.E_initial_MeV_u === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_initial_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_initial_MeV_u = parameters.E_initial_MeV_u;

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
	if(typeof parameters.slab_thickness_m === "undefined"){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER slab_thickness_m IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let slab_thickness_m = parameters.slab_thickness_m;

	/*********************CALL FUNCTION******************************/
	let result = at_csda_energy_after_slab_e_mev_u_single(E_initial_MeV_u, particle_no, material_no, slab_thickness_m);


	return result;
}