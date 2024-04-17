const mongoose = require('mongoose');

const processedFeedbackSchema = mongoose.Schema({
    FacultyName: {
        type: String,
        required: true,
        unique: true
    },
    questionWiseRatings: [{
        QNO: {
            type: Number,
            required: true
        },
        averageRating: {
            type: Number,
            required: true
        }
    }]
});

module.exports = mongoose.model('ProcessedFeedback', processedFeedbackSchema);
