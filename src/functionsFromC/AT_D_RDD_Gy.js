export default function AT_D_RDD_Gy(parameters) {
    let at_d_rdd_gy = Module.cwrap('AT_D_RDD_Gy', 'number', ['number', 'array', 'number', 'number', 'number', 'number', 'array', 'number', 'number', 'number']);

    /*********************STANDARD PARAMETER*************************/
    if(!parameters.n){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let n = parameters.n;

    /*********************INPUT ARRAY********************************/
    if(!parameters.r_m){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER r_m IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let r_m = parameters.r_m;
    let r_mData = new Float64Array(r_m);
    let r_mDataBytesNumber = r_mData.length * r_mData.BYTES_PER_ELEMENT;
    let r_mDataPointer = Module._malloc(r_mDataBytesNumber);
    let r_mHeap = new Uint8Array(Module.HEAPF64.buffer, r_mDataPointer, r_mDataBytesNumber);
    r_mHeap.set(new Uint8Array(r_mData.buffer));

    /*********************STANDARD PARAMETER*************************/
    if(!parameters.E_MeV_u){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV_u = parameters.E_MeV_u;

    /*********************STANDARD PARAMETER*************************/
    if(!parameters.particle_no){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let particle_no = parameters.particle_no;

    /*********************STANDARD PARAMETER*************************/
    if(!parameters.material_no){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let material_no = parameters.material_no;

    /*********************STANDARD PARAMETER*************************/
    if(!parameters.rdd_model){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER rdd_model IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let rdd_model = parameters.rdd_model;

    /*********************INPUT ARRAY********************************/
    if(!parameters.rdd_parameter){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER rdd_parameter IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let rdd_parameter = parameters.rdd_parameter;
    let rdd_parameterData = new Float64Array(rdd_parameter);
    let rdd_parameterDataBytesNumber = rdd_parameterData.length * rdd_parameterData.BYTES_PER_ELEMENT;
    let rdd_parameterDataPointer = Module._malloc(rdd_parameterDataBytesNumber);
    let rdd_parameterHeap = new Uint8Array(Module.HEAPF64.buffer, rdd_parameterDataPointer, rdd_parameterDataBytesNumber);
    rdd_parameterHeap.set(new Uint8Array(rdd_parameterData.buffer));

    /*********************STANDARD PARAMETER*************************/
    if(!parameters.er_model){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER er_model IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let er_model = parameters.er_model;

    /*********************STANDARD PARAMETER*************************/
    if(!parameters.stopping_power_source_no){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER stopping_power_source_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let stopping_power_source_no = parameters.stopping_power_source_no;

    /*********************OUTPUT ARRAY*******************************/
    let D_RDD_GyReturnData = new Float64Array(new Array(n));
    let D_RDD_GyReturnDataBytesNumber = D_RDD_GyReturnData.length * D_RDD_GyReturnData.BYTES_PER_ELEMENT;
    let D_RDD_GyReturnDataPointer = Module._malloc(D_RDD_GyReturnDataBytesNumber);
    let D_RDD_GyReturnHeap = new Uint8Array(Module.HEAPF64.buffer, D_RDD_GyReturnDataPointer, D_RDD_GyReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/
    let result = at_d_rdd_gy(n, r_mHeap, E_MeV_u, particle_no, material_no, rdd_model, rdd_parameterHeap, er_model, stopping_power_source_no, D_RDD_GyReturnHeap.byteOffset);
    let resultFromArray = new Float64Array(D_RDD_GyReturnHeap.buffer, D_RDD_GyReturnHeap.byteOffset, D_RDD_GyReturnData.length);

    Module._free(r_mHeap.byteOffset);
    Module._free(rdd_parameterHeap.byteOffset);
    Module._free(D_RDD_GyReturnHeap.byteOffset);

    return [].slice.call(resultFromArray);
}