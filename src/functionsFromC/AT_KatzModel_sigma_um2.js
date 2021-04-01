export default function AT_KatzModel_sigma_um2(parameters) {
    let at_katzmodel_sigma_um2 = Module.cwrap('AT_KatzModel_sigma_um2', 'number', ['number', 'array', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.n === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let n = parameters.n;

    /*********************INPUT ARRAY********************************/
    if(typeof parameters.E_MeV_u === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV_u = parameters.E_MeV_u;
    let E_MeV_uData = new Float64Array(E_MeV_u);
    let E_MeV_uDataBytesNumber = E_MeV_uData.length * E_MeV_uData.BYTES_PER_ELEMENT;
    let E_MeV_uDataPointer = Module._malloc(E_MeV_uDataBytesNumber);
    let E_MeV_uHeap = new Uint8Array(Module.HEAPF64.buffer, E_MeV_uDataPointer, E_MeV_uDataBytesNumber);
    E_MeV_uHeap.set(new Uint8Array(E_MeV_uData.buffer));

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.particle_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let particle_no = parameters.particle_no;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.m === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER m IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let m = parameters.m;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.D0_Gy === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER D0_Gy IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let D0_Gy = parameters.D0_Gy;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.a0_um === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER a0_um IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let a0_um = parameters.a0_um;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.katz_model_flavour === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER katz_model_flavour IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let katz_model_flavour = parameters.katz_model_flavour;

    /*********************STANDARD PARAMETER*************************/
    let stop_power_source = 2; // PSTAR

    /*********************OUTPUT ARRAY*******************************/
    let sigma_um2ReturnData = new Float64Array(new Array(n));
    let sigma_um2ReturnDataBytesNumber = sigma_um2ReturnData.length * sigma_um2ReturnData.BYTES_PER_ELEMENT;
    let sigma_um2ReturnDataPointer = Module._malloc(sigma_um2ReturnDataBytesNumber);
    let sigma_um2ReturnHeap = new Uint8Array(Module.HEAPF64.buffer, sigma_um2ReturnDataPointer, sigma_um2ReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/
    let result = at_katzmodel_sigma_um2(n, E_MeV_uHeap, particle_no, m, D0_Gy, a0_um, katz_model_flavour, stop_power_source, sigma_um2ReturnHeap.byteOffset);
    let resultFromArray = new Float64Array(sigma_um2ReturnHeap.buffer, sigma_um2ReturnHeap.byteOffset, sigma_um2ReturnData.length);

    Module._free(E_MeV_uHeap.byteOffset);
    Module._free(sigma_um2ReturnHeap.byteOffset);

    return [].slice.call(resultFromArray);
}