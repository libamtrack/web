export default function AT_range_fwhm_Bortfeld_cm(parameters) {
    let at_range_bortfeld_cm = Module.cwrap('AT_range_Bortfeld_cm', 'number', ['number', 'number', 'number', 'number', 'number', 'undefined']);
    let at_fwhm_bortfeld_cm = Module.cwrap('AT_fwhm_Bortfeld_cm', 'number', ['number', 'number', 'number', 'number', 'number', 'undefined']);
    let at_max_plateau_bortfeld = Module.cwrap('AT_max_plateau_Bortfeld', 'number', ['number', 'number', 'number', 'number', 'number', 'undefined']);

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.E_MeV_u === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV_u = parameters.E_MeV_u;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.sigma_E_MeV_u === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER sigma_E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let sigma_E_MeV_u = parameters.sigma_E_MeV_u;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.material_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let material_no = parameters.material_no;

    /*********************STANDARD PARAMETER*************************/
    let eps = -1;

    /*********************STANDARD PARAMETER*************************/
    let dose_drop = -1;

    /*********************STANDARD PARAMETER*************************/
    let search_direction = 1;

    /*********************CALL FUNCTION******************************/
    let range_cm = at_range_bortfeld_cm(E_MeV_u, sigma_E_MeV_u, material_no, eps, dose_drop, search_direction);
    let fwhm_cm = at_fwhm_bortfeld_cm(E_MeV_u, sigma_E_MeV_u, material_no, eps, dose_drop, search_direction);
    let max_plateau = at_max_plateau_bortfeld(E_MeV_u, sigma_E_MeV_u, material_no, eps, dose_drop, search_direction);

    return [range_cm, fwhm_cm, max_plateau];
}