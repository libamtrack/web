import {getParticles} from "../../functionsFromC/AT_DataParticle";
import {getMaterials} from "../../functionsFromC/AT_DataMaterial";

export default class DataImporter {
    particles() {
        return getParticles();
    }

    materials() {
        return getMaterials();
    }
}