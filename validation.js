class InputValidator {
    static validateNumber(value, fieldName) {
        if (value === '' || isNaN(value)) {
            throw new Error(`${fieldName} must be a valid number`);
        }
        if (value < 0) {
            throw new Error(`${fieldName} cannot be negative`);
        }
        return parseFloat(value);
    }

    static validateInputs(formData) {
        const validated = {
            sectionType: formData.get('sectionType'),
            effectiveStress: this.validateNumber(formData.get('effectiveStress'), 'Effective stress'),
            compressionFlange: this.validateNumber(formData.get('compressionFlange'), 'Compression flange thickness'),
            k2: this.validateNumber(formData.get('k2'), 'k2'),
            frictionCoef: this.validateNumber(formData.get('frictionCoef'), 'Friction coefficient'),
            totalDepth: this.validateNumber(formData.get('totalDepth'), 'Total depth')
        };

        if (validated.sectionType === 'T') {
            validated.steelArea = this.validateNumber(formData.get('steelArea'), 'Steel area');
            validated.yieldStrength = this.validateNumber(formData.get('yieldStrength'), 'Yield strength');
            validated.holeArea = this.validateNumber(formData.get('holeArea'), 'Hole area');
            validated.concreteArea = this.validateNumber(formData.get('concreteArea'), 'Concrete area');
            validated.width = this.validateNumber(formData.get('width'), 'Width');
            validated.webWidth = this.validateNumber(formData.get('webWidth'), 'Web width');
            validated.concreteStrength = this.validateNumber(formData.get('concreteStrength'), 'Concrete strength');
        }

        return validated;
    }
}