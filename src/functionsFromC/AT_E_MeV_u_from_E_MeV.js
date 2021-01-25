export default function AT_E_MeV_u_from_E_MeV(parameters) {
    let at_e_mev_u_from_e_mev = Module.cwrap('AT_E_MeV_u_from_E_MeV', 'number', ['number', 'number']);

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.E_MeV === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV = parameters.E_MeV;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.particle_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let particle_no = parameters.particle_no;

    /*********************CALL FUNCTION******************************/
    let result = at_e_mev_u_from_e_mev(E_MeV, particle_no);


    return result;
}