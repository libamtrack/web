export default function AT_effective_charge_from_E_MeV_u_single(parameters) {
	let at_effective_charge_from_e_mev_u_single = Module.cwrap('AT_effective_charge_from_E_MeV_u_single', 'number', ['number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.E_MeV_u){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_MeV_u = parameters.E_MeV_u;

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.particle_no){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;

	/*********************CALL FUNCTION******************************/
	let result = at_effective_charge_from_e_mev_u_single(E_MeV_u, particle_no);


	return result;
}