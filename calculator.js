class TendonCalculator {
    calculateLps(h, frictionCoef) {
        return h / (1 + (frictionCoef * h / 2));
    }

    calculateK2d(sectionType, params) {
        if (sectionType === 'T') {
            const { steelArea, yieldStrength, holeArea, concreteArea, width, webWidth, 
                   concreteStrength } = params;
            return (steelArea * yieldStrength + (holeArea - concreteArea) * width - 
                   0.85 * concreteStrength * (width - webWidth) * concreteStrength) / 
                   (0.85 * webWidth * concreteStrength);
        } else {
            const { k2, compressionFlange } = params;
            return (k2 * compressionFlange) / 0.85;
        }
    }

    calculateStress(effectiveStress, compressionFlange, k2d, lps, yieldStrength) {
        const calculated = effectiveStress + 6200 * ((compressionFlange - k2d) / lps);
        return Math.min(calculated, yieldStrength || Infinity);
    }

    calculate(inputs) {
        try {
            const lps = this.calculateLps(inputs.totalDepth, inputs.frictionCoef);
            const k2d = this.calculateK2d(inputs.sectionType, inputs);
            const stress = this.calculateStress(
                inputs.effectiveStress,
                inputs.compressionFlange,
                k2d,
                lps,
                inputs.yieldStrength
            );

            return {
                lps: lps.toFixed(2),
                k2d: k2d.toFixed(2),
                stress: stress.toFixed(2)
            };
        } catch (error) {
            console.error('Calculation error:', error);
            throw new Error('Error performing calculations. Please check your inputs.');
        }
    }
}

const calculator = new TendonCalculator();