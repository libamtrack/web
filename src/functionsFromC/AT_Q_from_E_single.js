export default function AT_Q_from_E_single(parameters) {
	let at_q_from_e_mev_n_single = Module.cwrap('AT_Q_from_E_single', 'number', ['number', 'number']);
	let at_qeff_from_e_mev_n_single = Module.cwrap('AT_Qeff_from_E_single', 'number', ['number', 'number']);

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.E_MeV_n){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_n IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let E_MeV_n = parameters.E_MeV_n;

	/*********************STANDARD PARAMETER*************************/
	if(!parameters.particle_no){
		 alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
		 return "error";
	}
	let particle_no = parameters.particle_no;

	/*********************CALL FUNCTION******************************/
	let q = at_q_from_e_mev_n_single(E_MeV_n, particle_no);
	let qeff = at_qeff_from_e_mev_n_single(E_MeV_n, particle_no);


	return [q, qeff];
}