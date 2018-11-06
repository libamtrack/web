class ParticleNumber {
    constructor(number, name, massNumber) {
        this.number = number;
        this.name = name;
        this.massNumber = massNumber;
    }
}

export function getParticles() {
    return [
        new ParticleNumber(1, "H", 1),
        new ParticleNumber(2, "He", 4),
        new ParticleNumber(3, "Li", 7),
        new ParticleNumber(4, "Be", 9),
        new ParticleNumber(5, "B", 11),
        new ParticleNumber(6, "C", 12),
        new ParticleNumber(7, "N", 14),
        new ParticleNumber(8, "O", 16),
        new ParticleNumber(9, "F", 19),
        new ParticleNumber(10, "Ne", 20),
        new ParticleNumber(11, "Na", 23),
        new ParticleNumber(12, "Mg", 24),
        new ParticleNumber(13, "Al", 27),
        new ParticleNumber(14, "Si", 28),
        new ParticleNumber(15, "P", 31),
        new ParticleNumber(16, "S", 32),
        new ParticleNumber(17, "Cl", 35),
        new ParticleNumber(18, "Ar", 40),
        new ParticleNumber(19, "K", 39),
        new ParticleNumber(20, "Ca", 40),
        new ParticleNumber(21, "Sc", 45),
        new ParticleNumber(22, "Ti", 48),
        new ParticleNumber(23, "V", 51),
        new ParticleNumber(24, "Cr", 52),
        new ParticleNumber(25, "Mn", 55),
        new ParticleNumber(26, "Fe", 56),
        new ParticleNumber(27, "Co", 59),
        new ParticleNumber(28, "Ni", 58),
        new ParticleNumber(29, "Cu", 63),
        new ParticleNumber(30, "Zn", 64),
        new ParticleNumber(31, "Ga", 69),
        new ParticleNumber(32, "Ge", 74),
        new ParticleNumber(33, "As", 75),
        new ParticleNumber(34, "Se", 80),
        new ParticleNumber(35, "Br", 19),
        new ParticleNumber(36, "Kr", 84),
        new ParticleNumber(37, "Rb", 85),
        new ParticleNumber(38, "Sr", 88),
        new ParticleNumber(39, "Y", 89),
        new ParticleNumber(40, "Zr", 90),
        new ParticleNumber(41, "Nb", 93),
        new ParticleNumber(42, "Mo", 98),
        new ParticleNumber(43, "Tc", 99),
        new ParticleNumber(44, "Ru", 102),
        new ParticleNumber(45, "Rh", 103),
        new ParticleNumber(46, "Pd", 106),
        new ParticleNumber(47, "Ag", 107),
        new ParticleNumber(48, "Cd", 114),
        new ParticleNumber(49, "In", 115),
        new ParticleNumber(50, "Sn", 120),
        new ParticleNumber(51, "Sb", 121),
        new ParticleNumber(52, "Te", 130),
        new ParticleNumber(53, "I", 127),
        new ParticleNumber(54, "Xe", 132),
        new ParticleNumber(55, "Cs", 133),
        new ParticleNumber(56, "Ba", 138),
        new ParticleNumber(57, "La", 139),
        new ParticleNumber(58, "Ce", 140),
        new ParticleNumber(59, "Pr", 141),
        new ParticleNumber(60, "Nd", 142),
        new ParticleNumber(61, "Pm", 145),
        new ParticleNumber(62, "Sm", 152),
        new ParticleNumber(63, "Eu", 153),
        new ParticleNumber(64, "Gd", 158),
        new ParticleNumber(65, "Tb", 159),
        new ParticleNumber(66, "Dy", 164),
        new ParticleNumber(67, "Ho", 165),
        new ParticleNumber(68, "Er", 166),
        new ParticleNumber(69, "Tm", 169),
        new ParticleNumber(70, "Yb", 174),
        new ParticleNumber(71, "Lu", 175),
        new ParticleNumber(72, "Hf", 180),
        new ParticleNumber(73, "Ta", 181),
        new ParticleNumber(74, "W", 184),
        new ParticleNumber(75, "Re", 187),
        new ParticleNumber(76, "Os", 192),
        new ParticleNumber(77, "Ir", 193),
        new ParticleNumber(78, "Pt", 195),
        new ParticleNumber(79, "Au", 197),
        new ParticleNumber(80, "Hg", 202),
        new ParticleNumber(81, "Tl", 205),
        new ParticleNumber(82, "Pb", 208),
        new ParticleNumber(83, "Bi", 209),
        new ParticleNumber(84, "Po", 209),
        new ParticleNumber(86, "Rn", 222),
        new ParticleNumber(88, "Ra", 226),
        new ParticleNumber(89, "Ac", 227),
        new ParticleNumber(90, "Th", 232),
        new ParticleNumber(91, "Pa", 231),
        new ParticleNumber(92, "U", 238),
        new ParticleNumber(93, "Np", 237),
        new ParticleNumber(94, "Pu", 244),
        new ParticleNumber(95, "Am", 243),
        new ParticleNumber(96, "Cm", 247),
        new ParticleNumber(97, "Bk", 247),
        new ParticleNumber(98, "Cf", 251)
    ]

}

function AT_particle_no_from_Z_and_A_single(Z, A) {
    let at_particle_no_from_Z_and_A_single = Module.cwrap('AT_particle_no_from_Z_and_A_single', 'number', ['number', 'number']);
    let result = at_particle_no_from_Z_and_A_single(Z, A);
    return result;
}

//long AT_particle_no_from_particle_name_single( const char particle_name[] );
export function AT_particle_no_from_particle_name_single(particleName, massNumber) {
    let at_particle_no_from_particle_name_single = Module.cwrap('AT_particle_no_from_particle_name_single', 'number', ['string']);
    return at_particle_no_from_particle_name_single(String(massNumber + particleName))
}

// int AT_Z_from_element_acronym_single( const char acronym[] );

function AT_Z_from_element_acronym_single(acronym) {
    let at_Z_from_element_acronym_single = Module.cwrap('AT_Z_from_element_acronym_single', 'number', ['string']);
    return at_Z_from_element_acronym_single(acronym)
}