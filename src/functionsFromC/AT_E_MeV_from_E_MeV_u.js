export default function AT_E_MeV_from_E_MeV_u(parameters) {
    let at_e_mev_from_e_mev_u = Module.cwrap('AT_E_MeV_from_E_MeV_u', 'number', ['number', 'number']);

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.E_MeV_u === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV_u = parameters.E_MeV_u;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.particle_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let particle_no = parameters.particle_no;

    /*********************CALL FUNCTION******************************/
    let result = at_e_mev_from_e_mev_u(E_MeV_u, particle_no);


    return result;
}