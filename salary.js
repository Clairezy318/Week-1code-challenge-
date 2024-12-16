function calculateNetSalary(basicSalary, benefits) {
    // Constants and thresholds
    const PERSONAL_RELIEF = 2800; 
    const NHIF_RATES = [
        { max: 5999, rate: 150 },
        { max: 7999, rate: 300 },
        { max: 11999, rate: 400 },
        { max: 14999, rate: 500 },
        { max: 19999, rate: 600 },
        { max: 24999, rate: 750 },
        { max: 29999, rate: 850 },
        { max: 34999, rate: 900 },
        { max: 39999, rate: 950 },
        { max: 44999, rate: 1000 },
        { max: 49999, rate: 1100 },
        { max: 59999, rate: 1200 },
        { max: 69999, rate: 1300 },
        { max: 79999, rate: 1400 },
        { max: 89999, rate: 1500 },
        { max: 99999, rate: 1600 },
        { max: Infinity, rate: 1700 },
    ];

    // Calculate gross salary
    const grossSalary = basicSalary + benefits;

    // Calculate PAYE (Taxable Income)
    const calculatePAYE = (taxableIncome) => {
        let PAYE = 0;
        if (taxableIncome <= 24000) {
            PAYE = taxableIncome * 0.1;
        } else if (taxableIncome <= 32333) {
            PAYE = 24000 * 0.1 + (taxableIncome - 24000) * 0.25;
        } else if (taxableIncome <= 500000) {
            PAYE = 24000 * 0.1 + (32333 - 24000) * 0.25 + (taxableIncome - 32333) * 0.3;
        } else if (taxableIncome <= 800000) {
            PAYE = 24000 * 0.1 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.3 + (taxableIncome - 500000) * 0.325;
        } else {
            PAYE = 24000 * 0.1 + (32333 - 24000) * 0.25 + (500000 - 32333) * 0.3 + (800000 - 500000) * 0.325 + (taxableIncome - 800000) * 0.35;
        }
        return Math.max(PAYE - PERSONAL_RELIEF, 0); // Apply personal relief
    };

    const PAYE = calculatePAYE(grossSalary);

    // Calculate NHIF (Fixed rates based on gross salary)
    const calculateNHIF = (grossSalary) => {
        for (const { max, rate } of NHIF_RATES) {
            if (grossSalary <= max) {
                return rate;
            }
        }
        return 0; // Default case (should not reach here)
    };

    const NHIF = calculateNHIF(grossSalary);

    // Calculate NSSF Contributions (6% of pensionable pay)
    const calculateNSSF = (basicSalary) => {
        const tier1 = Math.min(basicSalary, 7000) * 0.06;
        const tier2 = Math.max(0, Math.min(basicSalary - 7000, 29000)) * 0.06;
        return tier1 + tier2;
    };

    const NSSF = calculateNSSF(basicSalary);

    // Calculate Net Salary
    const totalDeductions = PAYE + NHIF + NSSF;
    const netSalary = grossSalary - totalDeductions;

    // Results
    return {
        grossSalary: grossSalary.toFixed(2),
        PAYE: PAYE.toFixed(2),
        NHIF: NHIF.toFixed(2),
        NSSF: NSSF.toFixed(2),
        netSalary: netSalary.toFixed(2),
    };
}

// Example usage
//const basicSalary = 100000; 
//const benefits = 30000; 

 //User Input (uncomment to use)
 const basicSalary = parseFloat(prompt("Enter Basic Salary: "));
 const benefits = parseFloat(prompt("Enter Benefits: "));

// Calculate salary details
const salaryDetails = calculateNetSalary(basicSalary, benefits);

console.log("Gross Salary:", salaryDetails.grossSalary);
console.log("PAYE:", salaryDetails.PAYE);
console.log("NHIF:", salaryDetails.NHIF);
console.log("NSSF:", salaryDetails.NSSF);
console.log("Net Salary:", salaryDetails.netSalary);