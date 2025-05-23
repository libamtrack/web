/**
 * Calculates the Continuous Slowing Down Approximation (CSDA) range in g/cm2 for multiple particles.
 * This function serves as a JavaScript wrapper for the C function AT_CSDA_range_g_cm2_multi from libAT.
 * 
 * The CSDA range represents the expected path length a charged particle travels until it comes to rest,
 * calculated by integrating the reciprocal of the stopping power with respect to energy.
 * 
 * @param {Object} parameters - Input parameters object
 * @param {number} parameters.n - Number of particles to calculate CSDA range for
 * @param {Array<number>} parameters.E_initial_MeV_u - Initial energies in MeV per nucleon
 * @param {Array<number>} parameters.particle_no - Particle type identifiers
 * @param {number} parameters.material_no - Material identifier
 * @returns {Array<number>} CSDA ranges in g/cm2 for each particle
 */
export default function AT_CSDA_range_g_cm2_multi(parameters) {

    // Validate required parameters
    if (!parameters) {
      throw new Error("Parameters object is required.");
    }
    const requiredParams = ['n', 'E_initial_MeV_u', 'particle_no', 'material_no'];
    for (const param of requiredParams) {
      if (typeof parameters[param] === "undefined") {
        throw new Error(`Missing parameter: ${param}`);
      }
    }

    // Extract parameters from the input object
    const n = parameters.n;
    const E_initial_MeV_u = parameters.E_initial_MeV_u;
    if (!Array.isArray(E_initial_MeV_u)) {
      throw new Error("Parameter 'E_initial_MeV_u' must be an array.");
    }
    const particle_no = parameters.particle_no;
    const material_no = parameters.material_no;

    // Create a JavaScript wrapper for the C function using Emscripten's cwrap
    // null indicates no return type (the function returns values through pointers)
    const at_csda_range_g_cm2_multi = Module.cwrap('AT_CSDA_range_g_cm2_multi', null, [
      'number', // n
      'number', // E_initial_MeV_u pointer
      'number', // E_final_MeV_u pointer
      'number', // particle_no pointer
      'number', // material_no
      'number'  // CSDA_range_g_cm2 pointer
    ]);
  
    // Allocate memory for the initial energy array and copy data to Emscripten's heap
    const E_initial_MeV_uData = new Float64Array(E_initial_MeV_u);
    const E_initial_MeV_uDataBytesNumber = E_initial_MeV_uData.length * E_initial_MeV_uData.BYTES_PER_ELEMENT;
    const E_initial_MeV_uDataPointer = Module._malloc(E_initial_MeV_uDataBytesNumber);
    const E_initial_MeV_uHeap = new Uint8Array(Module.HEAPF64.buffer, E_initial_MeV_uDataPointer, E_initial_MeV_uDataBytesNumber);
    E_initial_MeV_uHeap.set(new Uint8Array(E_initial_MeV_uData.buffer));

    // Create final energy array (all zeros for complete stopping)
    // The final energy is set to 0 MeV/u to calculate the full CSDA range
    const E_final_MeV_uData = new Float64Array(n);
    for (let i = 0; i < E_final_MeV_uData.length; i++) {
        E_final_MeV_uData[i] = 0.0;
    }
    const E_final_MeV_uDataBytesNumber = E_final_MeV_uData.length * E_final_MeV_uData.BYTES_PER_ELEMENT;
    const E_final_MeV_uDataPointer = Module._malloc(E_final_MeV_uDataBytesNumber);
    const E_final_MeV_uHeap = new Uint8Array(Module.HEAPF64.buffer, E_final_MeV_uDataPointer, E_final_MeV_uDataBytesNumber);
    E_final_MeV_uHeap.set(new Uint8Array(E_final_MeV_uData.buffer));

    // Create array for particle_no, using Int32Array for particle identifiers
    const particle_noData = new Int32Array(particle_no);
    const particle_noDataBytesNumber = particle_noData.length * particle_noData.BYTES_PER_ELEMENT;
    const particle_noDataPointer = Module._malloc(particle_noDataBytesNumber);
    const particle_noHeap = new Uint8Array(Module.HEAP32.buffer, particle_noDataPointer, particle_noDataBytesNumber);
    particle_noHeap.set(new Uint8Array(particle_noData.buffer));

    // Create output array to store the calculated CSDA ranges
    const CSDA_range_g_cm2ReturnData = new Float64Array(n);
    const CSDA_range_g_cm2ReturnDataBytesNumber = CSDA_range_g_cm2ReturnData.length * CSDA_range_g_cm2ReturnData.BYTES_PER_ELEMENT;
    const CSDA_range_g_cm2ReturnDataPointer = Module._malloc(CSDA_range_g_cm2ReturnDataBytesNumber);

    try {
        // Call the C function with pointers to the allocated memory
        at_csda_range_g_cm2_multi(
            n,
            E_initial_MeV_uDataPointer,
            E_final_MeV_uDataPointer,
            particle_noDataPointer,
            material_no,
            CSDA_range_g_cm2ReturnDataPointer
        );
        
        // Create a view of the results in the Emscripten heap
        const resultFromArray = new Float64Array(Module.HEAPF64.buffer, CSDA_range_g_cm2ReturnDataPointer, n);
        
        // Return a JavaScript array with the results
        return Array.from(resultFromArray);
      
    } finally {
        // // Free the allocated memory to prevent memory leaks
        // Module._free(E_initial_MeV_uDataPointer);
        // Module._free(E_final_MeV_uDataPointer);
        // Module._free(particle_noDataPointer);
        // Module._free(CSDA_range_g_cm2ReturnDataPointer);
    }
}