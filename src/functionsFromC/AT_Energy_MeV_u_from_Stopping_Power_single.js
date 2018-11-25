export default function AT_Energy_MeV_u_from_Stopping_Power_single(parameters) {
	alert("Parameters: ", parameters);
	let at_energy_mev_u_from_stopping_power_single = Module.cwrap('AT_Energy_MeV_u_from_Stopping_Power_single', 'number', ['number', 'number', 'number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.stopping_power_source_no === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER stopping_power_source_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let stopping_power_source_no = parameters.stopping_power_source_no;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.Stopping_Power_MeV_cm2_g === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER Stopping_Power_MeV_cm2_g IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let Stopping_Power_MeV_cm2_g = parameters.Stopping_Power_MeV_cm2_g;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.particle_no === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;

	/*********************STANDARD PARAMETER*************************/
	if(typeof parameters.material_no === undefined){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let material_no = parameters.material_no;

	/*********************CALL FUNCTION******************************/
	let result = at_energy_mev_u_from_stopping_power_single(stopping_power_source_no, Stopping_Power_MeV_cm2_g, particle_no, material_no);


	return result;
}