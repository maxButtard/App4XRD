from pymatgen.core import Lattice
from pymatgen.analysis.diffraction.xrd import XRDCalculator

xrd_calc = XRDCalculator(wavelength="CuKa")


# ==========================================
# GENERATE XRD PATTERN
# ==========================================

def generate_pattern(structure):

    pattern = xrd_calc.get_pattern(
        structure,
        two_theta_range=(10, 120)
    )

    return {

        "x": pattern.x.tolist(),

        "y": pattern.y.tolist(),

        "hkls": pattern.hkls,

        "lattice": {

            "a": structure.lattice.a,

            "b": structure.lattice.b,

            "c": structure.lattice.c,

            "alpha": structure.lattice.alpha,

            "beta": structure.lattice.beta,

            "gamma": structure.lattice.gamma
        }
    }


# ==========================================
# UPDATE LATTICE
# ==========================================

def update_lattice(structure, params):

    structure.lattice = Lattice.from_parameters(

        params.a,

        params.b,

        params.c,

        params.alpha,

        params.beta,

        params.gamma
    )

    return structure