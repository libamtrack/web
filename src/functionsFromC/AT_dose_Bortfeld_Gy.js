export default function AT_dose_Bortfeld_Gy(parameters) {
    // Validate required parameters
    if (!parameters) {
      throw new Error("Parameters object is required.");
    }
    const requiredParams = ['n', 'z_cm', 'E_MeV', 'entrance_dose_Gy', 'sigma_E_MeV', 'material_no', 'eps'];
    for (const param of requiredParams) {
      if (typeof parameters[param] === "undefined") {
        throw new Error(`Missing parameter: ${param}`);
      }
    }
  
    const n = parameters.n;
    const z_cm = parameters.z_cm;
    if (!Array.isArray(z_cm)) {
      throw new Error("Parameter 'z_cm' must be an array.");
    }
    const E_MeV = parameters.E_MeV;
    const entrance_dose_Gy = parameters.entrance_dose_Gy;
    const sigma_E_MeV = parameters.sigma_E_MeV;
    const material_no = parameters.material_no;
    const eps = parameters.eps;
  
    // Setup wasm functions
    // Note: Change second argument from 'array' to 'number'
    const at_dose_bortfeld_gy_multi = Module.cwrap('AT_dose_Bortfeld_Gy_multi', null,
      ['number', 'number', 'number', 'number', 'number', 'number', 'number', 'number']);
    const at_dose_bortfeld_gy_single = Module.cwrap('AT_dose_Bortfeld_Gy_single', 'number',
      ['number', 'number', 'number', 'number', 'number', 'number']);
    const at_range_bortfeld_cm = Module.cwrap('AT_range_Bortfeld_cm', 'number',
      ['number', 'number', 'number', 'number', 'number', 'undefined']);
    const at_fwhm_bortfeld_cm = Module.cwrap('AT_fwhm_Bortfeld_cm', 'number',
        ['number', 'number', 'number', 'number']);
    const at_max_plateau_bortfeld = Module.cwrap('AT_max_plateau_Bortfeld', 'number',
        ['number', 'number', 'number', 'number']);
  
    // Allocate memory for the input array z_cm and the output array dose_Gy
    const z_cmData = new Float64Array(z_cm);
    const z_cmDataBytesNumber = z_cmData.length * z_cmData.BYTES_PER_ELEMENT;
    const z_cmDataPointer = Module._malloc(z_cmDataBytesNumber);
    const z_cmHeap = new Uint8Array(Module.HEAPF64.buffer, z_cmDataPointer, z_cmDataBytesNumber);
    z_cmHeap.set(new Uint8Array(z_cmData.buffer));
  
    // Create output array with proper size
    const dose_GyReturnData = new Float64Array(n);
    const dose_GyReturnDataBytesNumber = dose_GyReturnData.length * dose_GyReturnData.BYTES_PER_ELEMENT;
    const dose_GyReturnDataPointer = Module._malloc(dose_GyReturnDataBytesNumber);
    // const dose_GyReturnHeap = new Uint8Array(Module.HEAPF64.buffer, dose_GyReturnDataPointer, dose_GyReturnDataBytesNumber);
  
    try {
      // Calculate entrance dose for unit fluence at depth z_cm = 0
      const entrance_dose_for_unit_fluence_Gy = at_dose_bortfeld_gy_single(0.0, 1.0, E_MeV, sigma_E_MeV, material_no, eps);
      const fluence_cm2 = entrance_dose_Gy / entrance_dose_for_unit_fluence_Gy;
  
      // Compute dose over all depths: pass pointer instead of typed array view
      at_dose_bortfeld_gy_multi(n, z_cmDataPointer, fluence_cm2, E_MeV, sigma_E_MeV, material_no, eps, dose_GyReturnDataPointer);
      const resultFromArray = new Float64Array(Module.HEAPF64.buffer, dose_GyReturnDataPointer, n);
  
      // Compute additional metadata
      const dose_drop = -1;
      const search_direction = 1;
      const range_cm = at_range_bortfeld_cm(E_MeV, sigma_E_MeV, material_no, eps, dose_drop, search_direction);
      const fwhm_cm = at_fwhm_bortfeld_cm(E_MeV, sigma_E_MeV, material_no, eps);
      const max_plateau = at_max_plateau_bortfeld(E_MeV, sigma_E_MeV, material_no, eps);
  
      return {
        data: Array.from(resultFromArray),
        metadata: {
          range_cm: range_cm,
          fwhm_cm: fwhm_cm,
          max_plateau: max_plateau
        }
      };
    } finally {
      // Free allocated memory to avoid memory leaks
    //   Module._free(z_cmDataPointer);
    //   Module._free(dose_GyReturnDataPointer);
    }
  }
  