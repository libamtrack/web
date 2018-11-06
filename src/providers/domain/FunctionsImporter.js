import AT_Stopping_Power_with_no from '../../functionsFromC/AT_Stopping_Power_with_no';
import {AT_particle_no_from_particle_name_single, getParticles} from '../../functionsFromC/AT_DataParticle';
import AT_E_from_beta_single from '../../functionsFromC/AT_E_from_beta_single';
import AT_E_from_beta from '../../functionsFromC/AT_E_from_beta';
import {getNumber} from '../../functionsFromC/AT_DataMaterial';
import AT_beta_from_E_single from '../../functionsFromC/AT_beta_from_E_single.js'

export default class FunctionsImporter {
    StPowerWithNo(data, formData) {
        const nParticles = getParticles();
        let massNumber;
        let newParticle;
        for (let i = 0; i < nParticles.length; i++){
            if (nParticles[i].name === formData.particle) {
                massNumber = nParticles[i].massNumber;
                newParticle = AT_particle_no_from_particle_name_single(formData.particle, massNumber);
            }
        }

        let particles = [];
        for (let i = 0; i < data.length; i++)
            particles.push(newParticle);

        return AT_Stopping_Power_with_no(1, data, particles, getNumber(formData.material));
    }

    BetaFromEnergySingle(data) {
        return AT_beta_from_E_single(data)
    }

    EnergyFromBetaSingle(formData) {
        return AT_E_from_beta_single(formData);
    }

    EnergyFromBeta(data, formData) {
        return AT_E_from_beta(data);
    }
}