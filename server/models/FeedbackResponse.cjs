const mongoose = require('mongoose');

const feedbackResponseSchema = mongoose.Schema({

    StudentID: {
        type: String,
        required: true,
        unique: true
    },

    FacultyName: {
        type: String,
        required: true
    },

    Feedback: [{
        courseName: {
            type: String,
            required: true
        },
        ratings: [{
            QNO: {
                type: Number,
                required: true
            },
            Rating: {
                type: Number,
                required: true
            }
        }],
        labComment: {
            type: String
        },
        facultyComment: {
            type: String,
            required: true
        }
    }]

})

module.exports = mongoose.model('FeedbackResponse', feedbackResponseSchema);