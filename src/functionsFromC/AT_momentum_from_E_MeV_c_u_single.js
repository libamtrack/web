export default function AT_momentum_from_E_MeV_c_u_single(parameters) {
	let at_momentum_from_e_mev_c_u_single = Module.cwrap('AT_momentum_from_E_MeV_c_u_single', 'number', ['number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.E_MeV_u){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_MeV_u = parameters.E_MeV_u;

	/*********************CALL FUNCTION******************************/
	let result = at_momentum_from_e_mev_c_u_single(E_MeV_u);


	return result;
}