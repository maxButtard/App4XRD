from fastapi import APIRouter, UploadFile, File
from pymatgen.core import Structure

import tempfile
import shutil
import numpy as np

from app.services.xrd_service import (
    generate_pattern,
    update_lattice
)

from app.services.peak_service import detect_peaks

from app.models.xrd_models import LatticeParams

router = APIRouter()

loaded_structure = None


@router.post("/upload-cif")
async def upload_cif(file: UploadFile = File(...)):

    global loaded_structure

    with tempfile.NamedTemporaryFile(
        delete=False,
        suffix=".cif"
    ) as tmp:

        shutil.copyfileobj(file.file, tmp)

        # IMPORTANT
        tmp.flush()

        loaded_structure = Structure.from_file(tmp.name)

    pattern = generate_pattern(loaded_structure)

    return pattern


@router.post("/update-lattice")
async def update_structure(params: LatticeParams):

    global loaded_structure

    loaded_structure = update_lattice(
        loaded_structure,
        params
    )

    pattern = generate_pattern(loaded_structure)

    return pattern


@router.post("/upload-xy")
async def upload_xy(file: UploadFile = File(...)):

    data = np.loadtxt(file.file,skiprows=1)

    x = data[:, 0]
    y = data[:, 1]

    peaks = detect_peaks(x, y)

    return {
        "x": x.tolist(),
        "y": y.tolist(),
        "peaks": peaks
    }