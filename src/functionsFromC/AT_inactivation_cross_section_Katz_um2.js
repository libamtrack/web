export default function AT_KatzModel_inactivation_cross_section_m2(parameters) {
    let at_katzmodel_inactivation_cross_section_m2 = Module.cwrap('AT_KatzModel_inactivation_cross_section_m2', 'number', ['number', 'array', 'number', 'number', 'number', 'array', 'number', 'array', 'number', 'number']);

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
    let material_no = 1; // water

    /*********************STANDARD PARAMETER*************************/


    // middle one -> a0
    if(typeof parameters.a0_um === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER a0_um IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let a0_um = parameters.a0_um;

    if(typeof parameters.rdd_er_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER rdd_er_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let rdd_er_no = parameters.rdd_er_no;

    let er_model = 0; // default
    let rdd_model = 0; // default
    let rdd_parameters = []; // default
    if( rdd_er_no === 1 ){ // Katz + Waligorski
        er_model = 3; // Waligorski
        rdd_model = 6; // Katz extended
        rdd_parameters = [1e-10,a0_um * 1e-6,1e-12];
    } else { // Cucinotta + Tabata
        er_model = 6; // Katz
        rdd_model = 7; // Cucinotta extended
        rdd_parameters = [5e-11,a0_um * 1e-6,1e-12];
    }

    let rdd_parametersData = new Float64Array(rdd_parameters);
    let rdd_parametersDataBytesNumber = rdd_parametersData.length * rdd_parametersData.BYTES_PER_ELEMENT;
    let rdd_parametersDataPointer = Module._malloc(rdd_parametersDataBytesNumber);
    let rdd_parametersHeap = new Uint8Array(Module.HEAPF64.buffer, rdd_parametersDataPointer, rdd_parametersDataBytesNumber);
    rdd_parametersHeap.set(new Uint8Array(rdd_parametersData.buffer));

    /*********************INPUT ARRAY********************************/

    if(typeof parameters.m === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let m = parameters.m;
    if(typeof parameters.D0_Gy === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER D0_Gy IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let D0_Gy = parameters.D0_Gy;
    let gamma_parameters = [0,D0_Gy,1,m,0]; /// unused , D0, c, m, unused
    let gamma_parametersData = new Float64Array(gamma_parameters);
    let gamma_parametersDataBytesNumber = gamma_parametersData.length * gamma_parametersData.BYTES_PER_ELEMENT;
    let gamma_parametersDataPointer = Module._malloc(gamma_parametersDataBytesNumber);
    let gamma_parametersHeap = new Uint8Array(Module.HEAPF64.buffer, gamma_parametersDataPointer, gamma_parametersDataBytesNumber);
    gamma_parametersHeap.set(new Uint8Array(gamma_parametersData.buffer));

    /*********************STANDARD PARAMETER*************************/
    let stop_power_source = 2; // PSTAR

    /*********************OUTPUT ARRAY*******************************/
    let inactivation_cross_section_m2ReturnData = new Float64Array(new Array(n));
    let inactivation_cross_section_m2ReturnDataBytesNumber = inactivation_cross_section_m2ReturnData.length * inactivation_cross_section_m2ReturnData.BYTES_PER_ELEMENT;
    let inactivation_cross_section_m2ReturnDataPointer = Module._malloc(inactivation_cross_section_m2ReturnDataBytesNumber);
    let inactivation_cross_section_m2ReturnHeap = new Uint8Array(Module.HEAPF64.buffer, inactivation_cross_section_m2ReturnDataPointer, inactivation_cross_section_m2ReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/
    let result = at_katzmodel_inactivation_cross_section_m2(n, E_MeV_uHeap, particle_no, material_no, rdd_model, rdd_parametersHeap, er_model, gamma_parametersHeap, stop_power_source, inactivation_cross_section_m2ReturnHeap.byteOffset);
    let resultFromArray = new Float64Array(inactivation_cross_section_m2ReturnHeap.buffer, inactivation_cross_section_m2ReturnHeap.byteOffset, inactivation_cross_section_m2ReturnData.length);

    // multiply RBE with dose
    for (var i = 0; i < resultFromArray.length; i++) {
        resultFromArray[i] *= 1e6 * 1e6; // m2 -> um2
    }

    Module._free(E_MeV_uHeap.byteOffset);
    Module._free(rdd_parametersHeap.byteOffset);
    Module._free(gamma_parametersHeap.byteOffset);
    Module._free(inactivation_cross_section_m2ReturnHeap.byteOffset);

    return [].slice.call(resultFromArray);
}