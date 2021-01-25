export default function AT_E_MeV_u_from_E_MeV(parameters) {
    let at_e_mev_u_from_e_mev = Module.cwrap('AT_E_MeV_u_from_E_MeV', 'number', ['number', 'number']);
    let at_atomic_weight_from_particle_no = Module.cwrap('AT_atomic_weight_from_particle_no_single', 'number', ['number']);

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.E_MeV === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER E_MeV IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let E_MeV = parameters.E_MeV;

    /*********************STANDARD PARAMETER*************************/
    if(typeof parameters.particle_no === "undefined"){
        alert("MESSAGE TO DEVELOPER: NO PARAMETER particle_no IN OBJECT PASSED TO THIS FUNCTIONS");
        return "error";
    }
    let particle_no = parameters.particle_no;

    /*********************CALL FUNCTION******************************/
    let E_MeV_u = at_e_mev_u_from_e_mev(E_MeV, particle_no);
    let particle_mass = at_atomic_weight_from_particle_no(particle_no);

    return [E_MeV_u, particle_mass];
}