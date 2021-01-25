export default function AT_energy_spread_Bortfeld(parameters) {
    let at_fit_bortfeld = Module.cwrap('AT_fit_Bortfeld', 'null', ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.range_cm === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER range_cm IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let range_cm = parameters.range_cm;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.fwhm_cm === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER fwhm_cm IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let fwhm_cm = parameters.fwhm_cm;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.max_to_plateau === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER max_to_plateau IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let max_to_plateau = parameters.max_to_plateau;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.material_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let material_no = parameters.material_no;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.dose_drop === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER dose_drop IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let dose_drop = parameters.dose_drop;

    /*********************OUTPUT ARRAY*******************************/
    let E_MeVReturnData = new Float64Array(new Array(1));
    let E_MeVReturnDataBytesNumber = E_MeVReturnData.length * E_MeVReturnData.BYTES_PER_ELEMENT;
    let E_MeVReturnDataPointer = Module._malloc(E_MeVReturnDataBytesNumber);
    let E_MeVReturnHeap = new Uint8Array(Module.HEAPF64.buffer, E_MeVReturnDataPointer, E_MeVReturnDataBytesNumber);

    /*********************OUTPUT ARRAY*******************************/
    let sigma_E_MeVReturnData = new Float64Array(new Array(1));
    let sigma_E_MeVReturnDataBytesNumber = sigma_E_MeVReturnData.length * sigma_E_MeVReturnData.BYTES_PER_ELEMENT;
    let sigma_E_MeVReturnDataPointer = Module._malloc(sigma_E_MeVReturnDataBytesNumber);
    let sigma_E_MeVReturnHeap = new Uint8Array(Module.HEAPF64.buffer, sigma_E_MeVReturnDataPointer, sigma_E_MeVReturnDataBytesNumber);

    /*********************OUTPUT ARRAY*******************************/
    let epsReturnData = new Float64Array(new Array(1));
    let epsReturnDataBytesNumber = epsReturnData.length * epsReturnData.BYTES_PER_ELEMENT;
    let epsReturnDataPointer = Module._malloc(epsReturnDataBytesNumber);
    let epsReturnHeap = new Uint8Array(Module.HEAPF64.buffer, epsReturnDataPointer, epsReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/
    let result = at_fit_bortfeld(range_cm, fwhm_cm, max_to_plateau, material_no, dose_drop, E_MeVReturnHeap.byteOffset, sigma_E_MeVReturnHeap.byteOffset, epsReturnHeap.byteOffset);
    let resultFromArray_1 = new Float64Array(E_MeVReturnHeap.buffer, E_MeVReturnHeap.byteOffset, E_MeVReturnData.length);
    let resultFromArray_2 = new Float64Array(sigma_E_MeVReturnHeap.buffer, sigma_E_MeVReturnHeap.byteOffset, sigma_E_MeVReturnData.length);
    let resultFromArray_3 = new Float64Array(epsReturnHeap.buffer, epsReturnHeap.byteOffset, epsReturnData.length);

    return [resultFromArray_1[0], resultFromArray_2[0], resultFromArray_3[0]];
}