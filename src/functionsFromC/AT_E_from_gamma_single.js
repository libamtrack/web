export default function AT_E_from_gamma_single(parameters) {
	let at_e_from_gamma_single = Module.cwrap('AT_E_from_gamma_single', 'number', ['number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.gamma){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER gamma IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let gamma = parameters.gamma;

	/*********************CALL FUNCTION******************************/
	let result = at_e_from_gamma_single(gamma);


	return result;
}