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

  	const n = parameters.n;
    const E_initial_MeV_u = parameters.E_initial_MeV_u;
    if (!Array.isArray(E_initial_MeV_u)) {
      throw new Error("Parameter 'E_initial_MeV_u' must be an array.");
    }
	const particle_no = parameters.particle_no;
	const material_no = parameters.material_no;

	const at_csda_range_g_cm2_multi = Module.cwrap('AT_CSDA_range_g_cm2_multi', null, ['number', 'number', 'number', 'number', 'number', 'number']);
  
    // Allocate memory for the input array E_initial_MeV_u and the output array CSDA_range_g_cm2
    const E_initial_MeV_uData = new Float64Array(E_initial_MeV_u);
    const E_initial_MeV_uDataBytesNumber = E_initial_MeV_uData.length * E_initial_MeV_uData.BYTES_PER_ELEMENT;
    const E_initial_MeV_uDataPointer = Module._malloc(E_initial_MeV_uDataBytesNumber);
    const E_initial_MeV_uHeap = new Uint8Array(Module.HEAPF64.buffer, E_initial_MeV_uDataPointer, E_initial_MeV_uDataBytesNumber);
    E_initial_MeV_uHeap.set(new Uint8Array(E_initial_MeV_uData.buffer));

	// Create final energy array (all zeros for complete stopping)
	const E_final_MeV_uData = new Float64Array(n);
	for (let i = 0; i < E_final_MeV_uData.length; i++) {
		E_final_MeV_uData[i] = 0.0;
	}
	const E_final_MeV_uDataBytesNumber = E_final_MeV_uData.length * E_final_MeV_uData.BYTES_PER_ELEMENT;
	const E_final_MeV_uDataPointer = Module._malloc(E_final_MeV_uDataBytesNumber);
	const E_final_MeV_uHeap = new Uint8Array(Module.HEAPF64.buffer, E_final_MeV_uDataPointer, E_final_MeV_uDataBytesNumber);
	E_final_MeV_uHeap.set(new Uint8Array(E_final_MeV_uData.buffer));

	// create array for particle_no, using long integer
	const particle_noData = new Int32Array(particle_no);
	const particle_noDataBytesNumber = particle_noData.length * particle_noData.BYTES_PER_ELEMENT;
	const particle_noDataPointer = Module._malloc(particle_noDataBytesNumber);
	const particle_noHeap = new Uint8Array(Module.HEAP32.buffer, particle_noDataPointer, particle_noDataBytesNumber);
	particle_noHeap.set(new Uint8Array(particle_noData.buffer));


	// Create output array with proper size
    const CSDA_range_g_cm2ReturnData = new Float64Array(n);
    const CSDA_range_g_cm2ReturnDataBytesNumber = CSDA_range_g_cm2ReturnData.length * CSDA_range_g_cm2ReturnData.BYTES_PER_ELEMENT;
    const CSDA_range_g_cm2ReturnDataPointer = Module._malloc(CSDA_range_g_cm2ReturnDataBytesNumber);


	  try {
	
		// Compute dose over all depths: pass pointer instead of typed array view
		at_csda_range_g_cm2_multi(n, E_initial_MeV_uDataPointer, E_final_MeV_uDataPointer, particle_noDataPointer, material_no, CSDA_range_g_cm2ReturnDataPointer);
		const resultFromArray = new Float64Array(Module.HEAPF64.buffer, CSDA_range_g_cm2ReturnDataPointer, n);
	
		return Array.from(resultFromArray);
      
    } finally {
	}
}