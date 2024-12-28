document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calculatorForm');
    const tSectionInputs = document.getElementById('tSectionInputs');
    const results = document.getElementById('results');
    const sectionType = document.getElementById('sectionType');

    // Handle section type change
    sectionType.addEventListener('change', (e) => {
        if (e.target.value === 'T') {
            tSectionInputs.classList.remove('hidden');
            tSectionInputs.querySelectorAll('input').forEach(input => input.required = true);
        } else {
            tSectionInputs.classList.add('hidden');
            tSectionInputs.querySelectorAll('input').forEach(input => input.required = false);
        }
    });

    // Handle form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Clear previous error messages
        document.querySelectorAll('.error-message').forEach(el => el.remove());
        document.querySelectorAll('.error').forEach(el => el.classList.remove('error'));

        try {
            const formData = new FormData(form);
            const validatedInputs = InputValidator.validateInputs(formData);
            const calculationResults = calculator.calculate(validatedInputs);

            // Display results
            document.getElementById('lpsResult').textContent = calculationResults.lps;
            document.getElementById('k2dResult').textContent = calculationResults.k2d;
            document.getElementById('stressResult').textContent = calculationResults.stress;
            
            results.classList.remove('hidden');
        } catch (error) {
            const errorDiv = document.createElement('div');
            errorDiv.className = 'error-message';
            errorDiv.textContent = error.message;
            form.insertBefore(errorDiv, form.querySelector('button'));
        }
    });

    // Add input validation feedback
    form.querySelectorAll('input[type="number"]').forEach(input => {
        input.addEventListener('input', (e) => {
            const value = e.target.value;
            if (value === '' || isNaN(value) || parseFloat(value) < 0) {
                e.target.classList.add('error');
            } else {
                e.target.classList.remove('error');
            }
        });
    });
});