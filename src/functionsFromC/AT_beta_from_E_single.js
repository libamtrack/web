export default function AT_beta_from_E_single(parameters) {
    let at_beta_from_e_single = Module.cwrap('AT_beta_from_E_single', 'number', ['number']);

    /*********************STANDARD PARAMETER*************************/
    if (!parameters.E_MeV_u) {
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV_u = parameters.E_MeV_u;

    /*********************CALL FUNCTION******************************/
    let result = at_beta_from_e_single(E_MeV_u);


    return result;
}