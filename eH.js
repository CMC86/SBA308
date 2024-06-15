const CourseInfo = {
    id: 1,
    name: "Course A"
};

const AssignmentGroup = {
    id: 1,
    name: "Group A",
    course_id: 1,
    group_weight: 0.5,
    assignments: [
        {
            id: 101,
            name: "Assignment 1",
            due_at: "2024-06-20",
            points_possible: 100
        },
        {
            id: 102,
            name: "Assignment 2",
            due_at: "2024-06-25",
            points_possible: 200
        }
        // Add more assignments if needed
    ]
};

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    try {
        // Validate CourseInfo and AssignmentGroup
        if (AssignmentGroup.course_id !== CourseInfo.id) {
            throw new Error('AssignmentGroup does not belong to the specified CourseInfo');
        }

        // Function to calculate weighted average
        function calculateWeightedAverage(submissions, assignments) {
            let totalPoints = 0;
            let totalWeightedScore = 0;

            submissions.forEach(submission => {
                let assignment = assignments.find(a => a.id === submission.assignment_id);
                if (!assignment) {
                    throw new Error(`Assignment with ID ${submission.assignment_id} not found in the assignment group.`);
                }
                if (assignment.points_possible === 0) {
                    throw new Error(`Assignment ${assignment.id} has zero points possible.`);
                }

                // Handle late submission penalty if applicable
                // Placeholder logic for late penalty deduction
                let score = submission.submission.score;
                let maxPoints = assignment.points_possible;
                let weight = assignment.group_weight;

                totalPoints += maxPoints;
                totalWeightedScore += (score / maxPoints) * (weight * 100);
            });

            if (totalPoints === 0) {
                return 0; // Handle division by zero scenario
            }

            return (totalWeightedScore / totalPoints) * 100;
        }

        // Function to calculate assignment scores
        function calculateAssignmentScores(submissions, assignments) {
            let assignmentScores = {};

            submissions.forEach(submission => {
                let assignment = assignments.find(a => a.id === submission.assignment_id);
                if (!assignment) {
                    throw new Error(`Assignment with ID ${submission.assignment_id} not found in the assignment group.`);
                }
                if (assignment.points_possible === 0) {
                    throw new Error(`Assignment ${assignment.id} has zero points possible.`);
                }

                let score = (submission.submission.score / assignment.points_possible) * 100;
                assignmentScores[assignment.id] = score;
            });

            return assignmentScores;
        }

        let learnerData = [];

        // Iterate through LearnerSubmissions
        LearnerSubmissions.forEach(submission => {
            let learnerId = submission.learner_id;
            let assignments = AssignmentGroup.assignments.filter(a => a.course_id === CourseInfo.id);

            // Calculate average and assignment scores
            let avg = calculateWeightedAverage(submission.submissions, assignments);
            let scores = calculateAssignmentScores(submission.submissions, assignments);

            // Construct result object for the learner
            let result = {
                id: learnerId,
                avg: avg,
                ...scores
            };

            learnerData.push(result);
        });

        return learnerData;

    } catch (error) {
        switch (error.constructor) {
            case TypeError:
                console.error("Type Error:", error.message);
                break;
            case ReferenceError:
                console.error("Reference Error:", error.message);
                break;
            default:
                console.error("Error:", error.message);
        }
        throw error; // Propagate error to the caller
    }
}

// Example usage:
try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log(result);
} catch (error) {
    console.error("Unhandled Error:", error.message);
}
