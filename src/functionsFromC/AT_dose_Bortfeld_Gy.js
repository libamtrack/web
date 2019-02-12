export default function AT_dose_Bortfeld_Gy(parameters) {
    let at_dose_bortfeld_gy_multi = Module.cwrap('AT_dose_Bortfeld_Gy_multi', 'null', ['number', 'array', 'number', 'number', 'number', 'number', 'number', 'number']);

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
    if(typeof parameters.fluence_cm2 === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER fluence_cm2 IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let fluence_cm2 = parameters.fluence_cm2;

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

    /*** default value of eps parameter ***/
    let eps = -1;

    /*********************OUTPUT ARRAY*******************************/
    let dose_GyReturnData = new Float64Array(new Array(n));
    let dose_GyReturnDataBytesNumber = dose_GyReturnData.length * dose_GyReturnData.BYTES_PER_ELEMENT;
    let dose_GyReturnDataPointer = Module._malloc(dose_GyReturnDataBytesNumber);
    let dose_GyReturnHeap = new Uint8Array(Module.HEAPF64.buffer, dose_GyReturnDataPointer, dose_GyReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/
    let result = at_dose_bortfeld_gy_multi(n, z_cmHeap, E_MeV_u, fluence_cm2, sigma_E_MeV_u, material_no, eps, dose_GyReturnHeap.byteOffset);
    let resultFromArray = new Float64Array(dose_GyReturnHeap.buffer, dose_GyReturnHeap.byteOffset, dose_GyReturnData.length);

    Module._free(z_cmHeap.byteOffset);
    Module._free(dose_GyReturnHeap.byteOffset);

    return [].slice.call(resultFromArray);
}