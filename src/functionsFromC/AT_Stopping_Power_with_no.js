/**
 * Retrieves the electronic mass stopping power in MeV*cm2/g
 * for the requested energies and particles for a specified
 * material and data source. The data source is thereby
 * given via its integer id (s. AT_StoppingPowerData.h for
 * details). Data that should be read from a file
 * cannot be used with this method.
 *
 * @param[in]   stopping_power_source_no    id of the data source
 * @param[in]   n                            number of energies / particles
 * @param[in]   E_MeV_u                        kinetic energies in MeV per amu (array of size n)
 * @param[in]   particle_no                 particle numbers (array of size n)
 * @param[in]   material_no                 material number
 * @param[out]  stopping_power_MeV_cm2_g    array to return stopping powers (array of size n)
 * @return        status
 *
 *
 * C declaration: int AT_Mass_Stopping_Power_with_no(   const long stopping_power_source_no,
 *                                                      const long n,
 *                                                      const double E_MeV_u[],
 *                                                      const long particle_no[],
 *                                                      const long material_no,
 *                                                      double stopping_power_MeV_cm2_g[]);
 *
 * JS:
 * in: beta   --   array of numbers
 */
export default function AT_Stopping_Power_with_no(stopping_power_source_no, E_MeV_u, particle_no, material_no) {
    let at_stopping_power_with_no = Module.cwrap('AT_Stopping_Power_with_no', 'number', ['number', 'number', 'array', 'array', 'number', 'number']);

    let data = new Float64Array(E_MeV_u);
    let nDataBytes = data.length * data.BYTES_PER_ELEMENT;

    let dataPtr = Module._malloc(nDataBytes);

    let dataHeap = new Uint8Array(Module.HEAPF64.buffer, dataPtr, nDataBytes);
    dataHeap.set(new Uint8Array(data.buffer));

    let particleData = new Int32Array(particle_no);
    let nDataBytesP = particleData.length * particleData.BYTES_PER_ELEMENT;
    let dataPtrP = Module._malloc(nDataBytesP);
    let dataHeapP = new Uint8Array(Module.HEAP32.buffer, dataPtrP, nDataBytesP);
    dataHeapP.set(new Uint8Array(particleData.buffer));


    let returnData = new Float64Array(E_MeV_u);
    let returnDataBytes = returnData.length * returnData.BYTES_PER_ELEMENT;
    let returnDataPtr = Module._malloc(returnDataBytes);
    let returnDataHeap = new Int8Array(Module.HEAPF64.buffer, returnDataPtr, returnDataBytes);


    at_stopping_power_with_no(stopping_power_source_no, data.length, dataHeap, dataHeapP, material_no, returnDataHeap.byteOffset);
    let result = new Float64Array(returnDataHeap.buffer, returnDataHeap.byteOffset, data.length);

    Module._free(dataHeap.byteOffset);
    Module._free(dataHeapP.byteOffset);
    Module._free(returnDataHeap.byteOffset);
    return [].slice.call(result);
}