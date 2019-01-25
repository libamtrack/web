export default function AT_energy_loss_distributions(parameters) {

    let at_landau_energy_loss_distribution = Module.cwrap('AT_Landau_energy_loss_distribution', 'null', ['number', 'array', 'number', 'number', 'number', 'number', 'number']);
    let at_vavilov_energy_loss_distribution = Module.cwrap('AT_Vavilov_energy_loss_distribution', 'null', ['number', 'array', 'number', 'number', 'number', 'number', 'number']);

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.n === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER n IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let n = parameters.n;

    /*********************INPUT ARRAY********************************/
    if(typeof parameters.energy_loss_keV === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER energy_loss_keV IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let energy_loss_keV = parameters.energy_loss_keV;
    let energy_loss_keVData = new Float64Array(energy_loss_keV);
    let energy_loss_keVDataBytesNumber = energy_loss_keVData.length * energy_loss_keVData.BYTES_PER_ELEMENT;
    let energy_loss_keVDataPointer = Module._malloc(energy_loss_keVDataBytesNumber);
    let energy_loss_keVHeap = new Uint8Array(Module.HEAPF64.buffer, energy_loss_keVDataPointer, energy_loss_keVDataBytesNumber);
    energy_loss_keVHeap.set(new Uint8Array(energy_loss_keVData.buffer));

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.E_MeV_u === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV_u IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV_u = parameters.E_MeV_u;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.particle_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let particle_no = parameters.particle_no;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.material_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER material_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let material_no = parameters.material_no;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.slab_thickness_um === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER slab_thickness_um IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let slab_thickness_um = parameters.slab_thickness_um;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.energy_loss_model === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER energy_loss_model IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let energy_loss_model = parameters.energy_loss_model;

    /*********************OUTPUT ARRAY*******************************/
    let fDdDReturnData = new Float64Array(new Array(n));
    let fDdDReturnDataBytesNumber = fDdDReturnData.length * fDdDReturnData.BYTES_PER_ELEMENT;
    let fDdDReturnDataPointer = Module._malloc(fDdDReturnDataBytesNumber);
    let fDdDReturnHeap = new Uint8Array(Module.HEAPF64.buffer, fDdDReturnDataPointer, fDdDReturnDataBytesNumber);

    /*********************CALL FUNCTION******************************/

    if( energy_loss_model === 1 ){ // Vavilov
        let result = at_vavilov_energy_loss_distribution(n, energy_loss_keVHeap, E_MeV_u, particle_no, material_no, slab_thickness_um, fDdDReturnHeap.byteOffset);
    } else { // Landau
        let result = at_landau_energy_loss_distribution(n, energy_loss_keVHeap, E_MeV_u, particle_no, material_no, slab_thickness_um, fDdDReturnHeap.byteOffset);
    }

    let resultFromArray = new Float64Array(fDdDReturnHeap.buffer, fDdDReturnHeap.byteOffset, fDdDReturnData.length);

    Module._free(energy_loss_keVHeap.byteOffset);
    Module._free(fDdDReturnHeap.byteOffset);

    return [].slice.call(resultFromArray);
}