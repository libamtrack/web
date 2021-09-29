export default function AT_fluence_cm2_from_dose_Gy_single(parameters) {
    let at_fluence_cm2_from_dose_gy_single = Module.cwrap('AT_fluence_cm2_from_dose_Gy_single', 'number', ['number', 'number', 'number', 'number', 'number']);

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

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.D_Gy === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER D_Gy IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let D_Gy = parameters.D_Gy;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.material_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let material_no = parameters.material_no;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.stopping_power_source_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER stopping_power_source_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let stopping_power_source_no = parameters.stopping_power_source_no;

    /*********************CALL FUNCTION******************************/
    let result = at_fluence_cm2_from_dose_gy_single(E_MeV_u, particle_no, D_Gy, material_no, stopping_power_source_no);


    return result;
}