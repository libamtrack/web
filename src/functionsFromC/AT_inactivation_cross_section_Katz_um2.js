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
    console.log("E_MeV_u", E_MeV_u);
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
    let rdd_model = 7; // Cucinotta extended

    /*********************INPUT ARRAY********************************/

    // middle one -> a0
    let rdd_parameters = [5e-11,1e-8,1e-10];
    console.log("rdd_parameters", rdd_parameters);
    let rdd_parametersData = new Float64Array(rdd_parameters);
    let rdd_parametersDataBytesNumber = rdd_parametersData.length * rdd_parametersData.BYTES_PER_ELEMENT;
    let rdd_parametersDataPointer = Module._malloc(rdd_parametersDataBytesNumber);
    let rdd_parametersHeap = new Uint8Array(Module.HEAPF64.buffer, rdd_parametersDataPointer, rdd_parametersDataBytesNumber);
    rdd_parametersHeap.set(new Uint8Array(rdd_parametersData.buffer));

    /*********************STANDARD PARAMETER*************************/
    let er_model = 7; // Tabata

    /*********************INPUT ARRAY********************************/
        /// unused , D0, c, m, unused
    let gamma_parameters = [0,2,1,1,0];
    console.log("gamma_parameters", gamma_parameters);
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
    console.log("n", n);
    console.log("E_MeV_uHeap", E_MeV_uHeap);
    console.log("particle_no", particle_no);
    console.log("material_no", material_no);
    console.log("rdd_model", rdd_model);
    console.log("rdd_parametersHeap", rdd_parametersHeap);
    console.log("er_model", er_model);
    console.log("gamma_parametersHeap", gamma_parametersHeap);
    console.log("stop_power_source", stop_power_source);
    let result = at_katzmodel_inactivation_cross_section_m2(n, E_MeV_uHeap, particle_no, material_no, rdd_model, rdd_parametersHeap, er_model, gamma_parametersHeap, stop_power_source, inactivation_cross_section_m2ReturnHeap.byteOffset);
    let resultFromArray = new Float64Array(inactivation_cross_section_m2ReturnHeap.buffer, inactivation_cross_section_m2ReturnHeap.byteOffset, inactivation_cross_section_m2ReturnData.length);

    Module._free(E_MeV_uHeap.byteOffset);
    Module._free(rdd_parametersHeap.byteOffset);
    Module._free(gamma_parametersHeap.byteOffset);
    Module._free(inactivation_cross_section_m2ReturnHeap.byteOffset);

    return [].slice.call(resultFromArray);
}