export default function AT_LET_Wilkens_keV_um(parameters) {
    let at_let_t_wilkens_kev_um_multi = Module.cwrap('AT_LET_t_Wilkens_keV_um_multi', 'null', ['number', 'array', 'number', 'number', 'number', 'number']);
    let at_let_d_wilkens_kev_um_multi = Module.cwrap('AT_LET_d_Wilkens_keV_um_multi', 'null', ['number', 'array', 'number', 'number', 'number', 'number']);

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

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.material_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let material_no = parameters.material_no;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.averaging === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER averaging IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let averaging = parameters.averaging;

    /*********************OUTPUT ARRAY*******************************/
    let LET_keV_umReturnData = new Float64Array(new Array(n));
    let LET_keV_umReturnDataBytesNumber = LET_keV_umReturnData.length * LET_keV_umReturnData.BYTES_PER_ELEMENT;
    let LET_keV_umReturnDataPointer = Module._malloc(LET_keV_umReturnDataBytesNumber);
    let LET_keV_umReturnHeap = new Uint8Array(Module.HEAPF64.buffer, LET_keV_umReturnDataPointer, LET_keV_umReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/

    if( averaging === 1 ){ // dose-
        let result = at_let_d_wilkens_kev_um_multi(n, z_cmHeap, E_MeV, sigma_E_MeV, material_no, LET_keV_umReturnHeap.byteOffset);
    } else { // track
        let result = at_let_t_wilkens_kev_um_multi(n, z_cmHeap, E_MeV, sigma_E_MeV, material_no, LET_keV_umReturnHeap.byteOffset);
    }
    let resultFromArray = new Float64Array(LET_keV_umReturnHeap.buffer, LET_keV_umReturnHeap.byteOffset, LET_keV_umReturnData.length);

    return [].slice.call(resultFromArray);
}