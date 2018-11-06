class MaterialNumber {
    constructor(number, name) {
        this.number = number;
        this.name = name;
    }
}

export function getNumber(name) {
    const newArr = getMaterials().filter(material => material.name === name);

    return newArr[0].number;
}

export function getMaterials() {
    return [
        new MaterialNumber(1, "Liquid water"),
        new MaterialNumber(2, "Aluminium oxide"),
        new MaterialNumber(3, "Aluminium"),
        new MaterialNumber(4, "PMMA"),
        new MaterialNumber(5, "Alanine"),
        new MaterialNumber(6, "Lithium Fluoride"),
        new MaterialNumber(7, "Air dry (at sea level)"),
        new MaterialNumber(8, "Silicon"),
        new MaterialNumber(9, "Copper"),
        new MaterialNumber(10, "Tungsten"),
        new MaterialNumber(11, "Gammex tissue surrogate Lung (LN450)"),
        new MaterialNumber(12, "Gammex tissue surrogate AP6 Adipose RMI 453"),
        new MaterialNumber(13, "Gammex tissue surrogate BR12 Breast RMI454"),
        new MaterialNumber(14, "Gammex tissue surrogate CT Solid Water RMI451"),
        new MaterialNumber(15, "Gammex tissue surrogate Gammex Water"),
        new MaterialNumber(16, "Gammex tissue surrogate Muscle RMI452"),
        new MaterialNumber(17, "Gammex tissue surrogate LV1 Liver RMI"),
        new MaterialNumber(18, "Gammex tissue surrogate SR2 Brain"),
        new MaterialNumber(19, "Gammex tissue surrogate IB3 Inner Bone RMI 456"),
        new MaterialNumber(20, "Gammex tissue surrogate B200 Bone Mineral"),
        new MaterialNumber(21, "Gammex tissue surrogate CB2 30%  CaCO3"),
        new MaterialNumber(22, "Gammex tissue surrogate CB2 50%  CaCO3"),
        new MaterialNumber(23, "Gammex tissue surrogate SB3 Cortical Bone RMI 450"),
        new MaterialNumber(24, "Lead")
    ];
}