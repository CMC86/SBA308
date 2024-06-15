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

const LearnerSubmissions = [
    {
        learner_id: 1,
        submissions: [
            {
                assignment_id: 101,
                submission: {
                    submitted_at: "2024-06-18",
                    score: 85
                }
            },
            {
                assignment_id: 102,
                submission: {
                    submitted_at: "2024-06-25",
                    score: 180
                }
            }
            // Add more submissions if needed
        ]
    }
    // Add more learners if needed
];

function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
    // Validate CourseInfo and AssignmentGroup
    if (AssignmentGroup.course_id !== CourseInfo.id) {
        throw new Error('AssignmentGroup does not belong to the specified CourseInfo');
    }

    function getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions) {
        // Validate CourseInfo and AssignmentGroup
        if (AssignmentGroup.course_id !== CourseInfo.id) {
            throw new Error('AssignmentGroup does not belong to the specified CourseInfo');
        }
    
