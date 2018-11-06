export default function AT_E_from_beta_single(parameters) {
    let at_e_from_beta_single = Module.cwrap('AT_E_from_beta_single', 'number', ['number']);
    let beta = parameters.beta;
    if (!parameters.beta)
        console.error("NO PARAMETER: beta IN OBJECT PASSED TO THIS FUNCTIONS");
    let result = at_e_from_beta_single(beta);
    return result;
}