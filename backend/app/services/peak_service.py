from scipy.signal import find_peaks

def detect_peaks(x, y, prominence=0.5):

    peaks, _ = find_peaks(
        y,
        prominence=prominence,
        distance=15
    )

    return [
        {
            "x": float(x[i]),
            "y": float(y[i])
        }
        for i in peaks
    ]