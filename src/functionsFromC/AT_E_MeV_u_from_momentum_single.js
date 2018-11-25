export default function AT_E_MeV_u_from_momentum_single(parameters) {
	let at_e_mev_u_from_momentum_single = Module.cwrap('AT_E_MeV_u_from_momentum_single', 'number', ['number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.momentum_MeV_c_u){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER momentum_MeV_c_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let momentum_MeV_c_u = parameters.momentum_MeV_c_u;

	/*********************CALL FUNCTION******************************/
	let result = at_e_mev_u_from_momentum_single(momentum_MeV_c_u);


	return result;
}