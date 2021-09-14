export default function AT_RBE_proton(parameters) {
    let at_proton_rbe_multi = Module.cwrap('AT_proton_RBE_multi', 'null', ['number', 'array', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);

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
    if(typeof parameters.entrance_dose_Gy === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER entrance_dose_Gy IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let entrance_dose_Gy = parameters.entrance_dose_Gy;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.E_MeV === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV = parameters.E_MeV;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.sigma_E_MeV === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER sigma_E_MeV IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let sigma_E_MeV = parameters.sigma_E_MeV;

    /*** default value of eps parameter ***/
    let eps = -1;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.ref_alpha_beta_ratio === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER ref_alpha_beta_ratio IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let ref_alpha_beta_ratio = parameters.ref_alpha_beta_ratio;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.rbe_model_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER rbe_model_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let rbe_model_no = parameters.rbe_model_no;

    /*********************OUTPUT ARRAY*******************************/
    let rbeReturnData = new Float64Array(new Array(n));
    let rbeReturnDataBytesNumber = rbeReturnData.length * rbeReturnData.BYTES_PER_ELEMENT;
    let rbeReturnDataPointer = Module._malloc(rbeReturnDataBytesNumber);
    let rbeReturnHeap = new Uint8Array(Module.HEAPF64.buffer, rbeReturnDataPointer, rbeReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/
    let result = at_proton_rbe_multi(n, z_cmHeap, entrance_dose_Gy, E_MeV, sigma_E_MeV, eps, ref_alpha_beta_ratio, rbe_model_no, rbeReturnHeap.byteOffset);
    let resultFromArray = new Float64Array(rbeReturnHeap.buffer, rbeReturnHeap.byteOffset, rbeReturnData.length);

    return [].slice.call(resultFromArray);
}