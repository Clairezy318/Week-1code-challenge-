//Write a function that prompts the user to input student marks.
    //The input should be between 0 and 100.
    //The output should correspond the correct grade, as shown below: 
    //A > 79, B - 60 to 79, C - 59 to 49, D - 40 to 49, E - less 40
    
    //let mark = prompt("Input student marks (0 - 100)")
    // Function to grade the student based on the marks
    // Check if the input is a valid number

function studentGrading(mark) {
    if (mark > 79 && mark <= 100) {
        return "A";
    } else if (mark >= 60 && mark <= 79) {
        return "B";
    } else if (mark >= 50 && mark <= 59) {
        return "C";
    } else if (mark >= 40 && mark <= 49) {
        return "D";
    } else if (mark >= 0 && mark < 40) {
        return "E";
    } else {
        return "Invalid input. Marks should be between 0 and 100.";
    }
}

// Prompt the user for input
let markInput = prompt("Input student marks (0 - 100):");

// Convert the input to a number
let mark = Number(markInput);

// Check if the input is a valid number and display the grade
if (isNaN(mark)) {
    alert("Invalid input. Please enter a number.");
} else {
    let grade = studentGrading(mark);
    alert(`The grade for marks ${mark} is: ${grade}`);
}