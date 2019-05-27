export default function AT_dose_Bortfeld_Gy(parameters) {
    let at_dose_bortfeld_gy_multi = Module.cwrap('AT_dose_Bortfeld_Gy_multi', 'null', ['number', 'array', 'number', 'number', 'number', 'number', 'number', 'number']);
    let at_dose_bortfeld_gy_single = Module.cwrap('AT_dose_Bortfeld_Gy_single', 'number', ['number', 'number', 'number', 'number', 'number', 'number']);

    let at_range_bortfeld_cm = Module.cwrap('AT_range_Bortfeld_cm', 'number', ['number', 'number', 'number', 'number', 'number', 'undefined']);
    let at_fwhm_bortfeld_cm = Module.cwrap('AT_fwhm_Bortfeld_cm', 'number', ['number', 'number', 'number', 'number', 'number', 'undefined']);
    let at_max_plateau_bortfeld = Module.cwrap('AT_max_plateau_Bortfeld', 'number', ['number', 'number', 'number', 'number', 'number', 'undefined']);


    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.n === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let n = parameters.n;

    /*********************INPUT ARRAY********************************/
    if(typeof parameters.z_cm === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER z_cm IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let z_cm = parameters.z_cm;
    let z_cmData = new Float64Array(z_cm);
    let z_cmDataBytesNumber = z_cmData.length * z_cmData.BYTES_PER_ELEMENT;
    let z_cmDataPointer = Module._malloc(z_cmDataBytesNumber);
    let z_cmHeap = new Uint8Array(Module.HEAPF64.buffer, z_cmDataPointer, z_cmDataBytesNumber);
    z_cmHeap.set(new Uint8Array(z_cmData.buffer));

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.E_MeV_u === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV_u = parameters.E_MeV_u;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.entrance_dose_Gy === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER entrance_dose_Gy IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let entrance_dose_Gy = parameters.entrance_dose_Gy;

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
    if(typeof parameters.eps === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER eps IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let eps = parameters.eps;

    /*********************OUTPUT ARRAY*******************************/
    let dose_GyReturnData = new Float64Array(new Array(n));
    let dose_GyReturnDataBytesNumber = dose_GyReturnData.length * dose_GyReturnData.BYTES_PER_ELEMENT;
    let dose_GyReturnDataPointer = Module._malloc(dose_GyReturnDataBytesNumber);
    let dose_GyReturnHeap = new Uint8Array(Module.HEAPF64.buffer, dose_GyReturnDataPointer, dose_GyReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/

    let entrance_dose_for_unit_fluence_Gy = at_dose_bortfeld_gy_single(0.0, 1.0, E_MeV_u, sigma_E_MeV_u, material_no, eps);
    let fluence_cm2 = entrance_dose_Gy / entrance_dose_for_unit_fluence_Gy;

    let result = at_dose_bortfeld_gy_multi(n, z_cmHeap, E_MeV_u, fluence_cm2, sigma_E_MeV_u, material_no, eps, dose_GyReturnHeap.byteOffset);
    let resultFromArray = new Float64Array(dose_GyReturnHeap.buffer, dose_GyReturnHeap.byteOffset, dose_GyReturnData.length);

    Module._free(z_cmHeap.byteOffset);
    Module._free(dose_GyReturnHeap.byteOffset);


    /*********************STANDARD PARAMETER*************************/
    let dose_drop = -1;

    /*********************STANDARD PARAMETER*************************/
    let search_direction = 1;

    /*********************CALL FUNCTION******************************/
    let range_cm = at_range_bortfeld_cm(E_MeV_u, sigma_E_MeV_u, material_no, eps, dose_drop, search_direction);
    let fwhm_cm = at_fwhm_bortfeld_cm(E_MeV_u, sigma_E_MeV_u, material_no, eps, dose_drop, search_direction);
    let max_plateau = at_max_plateau_bortfeld(E_MeV_u, sigma_E_MeV_u, material_no, eps, dose_drop, search_direction);

    let combined ={'data' : [].slice.call(resultFromArray) , 'metadata' : [range_cm,fwhm_cm,max_plateau] };

    return combined;
}