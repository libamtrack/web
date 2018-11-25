export default function AT_max_electron_range_m(parameters) {
	let at_max_electron_range_m = Module.cwrap('AT_max_electron_range_m', 'number', ['number', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.E_MeV_u){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_MeV_u = parameters.E_MeV_u;

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.material_no){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.er_model){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER er_model IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let er_model = parameters.er_model;

	/*********************CALL FUNCTION******************************/
	let result = at_max_electron_range_m(E_MeV_u, material_no, er_model);


	return result;
}