export default function AT_effective_charge_from_beta_single(parameters) {
	let at_effective_charge_from_beta_single = Module.cwrap('AT_effective_charge_from_beta_single', 'number', ['number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.beta){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER beta IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let beta = parameters.beta;

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.Z){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER Z IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let Z = parameters.Z;

	/*********************CALL FUNCTION******************************/
	let result = at_effective_charge_from_beta_single(beta, Z);


	return result;
}