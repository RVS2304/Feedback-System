const csv = require('csvtojson');
const Question = require('../models/FeedbackQuestions.cjs');
const FeedbackResponse = require('../models/FeedbackResponse.cjs');
const ProcessedFeedback = require('../models/ProcessedFeedback.cjs');


const importQuestions = async (req, res) => {

    try {

        const jsonArray = await csv().fromFile(req.file.path);
        Question.insertMany(jsonArray);
        res.send({ status: 200, success: true, msg: 'Running' });

    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
}


const changeQuestions = async (req, res) => {

    try {

        const jsonArray = await csv().fromFile(req.file.path);
        Question.insertMany(jsonArray);
        res.send({ status: 200, success: true, msg: 'Running' });

    } catch (error) {
        res.send({ status: 400, success: false, msg: error.message });
    }
}

const fetchQuestions = async (req, res) => {

    try {
        const questions = await Question.find();
        res.json(questions.map(question => question.Question));
      } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).json({ error: 'Internal server error' });
      }
}



const submitFeedback = async (req, res) => {
  try {
    // Receive feedback data from the client
    const feedbackData = req.body;

    // Parse and save the feedback data
    await Promise.all(feedbackData.map(async feedbackItem => {
      // Extract data from the feedback item
      const { StudentID, FacultyName, Feedback } = feedbackItem;

      // Create a new feedback response instance
      const feedbackResponse = new FeedbackResponse({
        StudentID,
        FacultyName,
        Feedback
      });

      // Save the feedback response to the database
      await feedbackResponse.save();
    }));

    // Send success response
    res.status(200).json({ success: true, message: 'Feedback submitted successfully' });
  } catch (error) {
    console.error('Error submitting feedback:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};


const calculateQuestionWiseRatings = async (req, res) => {
  try {
    // Fetch all feedback responses
    const feedbackResponses = await FeedbackResponse.find();

    // Iterate over each feedback response
    feedbackResponses.forEach(async (response) => {
      const { FacultyName, Feedback } = response;

      // Initialize an array to store question-wise ratings
      const questionWiseRatings = [];

      // Initialize an object to store total ratings and counts per question
      const questionStats = {};

      // Iterate over each course feedback
      Feedback.forEach((courseFeedback) => {
        const { ratings } = courseFeedback;

        // Iterate over each rating for the course
        ratings.forEach(({ QNO, Rating }) => {
          // Add the rating to the corresponding question in questionStats
          if (!questionStats[QNO]) {
            questionStats[QNO] = { total: Rating, count: 1 };
          } else {
            questionStats[QNO].total += Rating;
            questionStats[QNO].count++;
          }
        });
      });

      // Calculate the average rating for each question and store in questionWiseRatings
      Object.keys(questionStats).forEach((QNO) => {
        const { total, count } = questionStats[QNO];
        const averageRating = total / count;
        questionWiseRatings.push({ QNO: parseInt(QNO), averageRating });
      });

      // Create or update the document in the ProcessedFeedback collection
      await ProcessedFeedback.findOneAndUpdate(
        { FacultyName },
        { $set: { FacultyName, questionWiseRatings } },
        { upsert: true, new: true }
      );
    });

    res.status(200).json({ success: true, message: 'Question-wise ratings calculated and stored successfully.' });
  } catch (error) {
    console.error('Error calculating question-wise ratings:', error);
  }
};


const getQuestionWiseRatings = async (req, res) => {
  try {
    const { facultyName } = req.body;

    // Find the processed feedback for the specified faculty
    const processedFeedback = await ProcessedFeedback.findOne({ FacultyName: facultyName });

    // If no processed feedback is found for the faculty, return an error
    if (!processedFeedback) {
      return res.status(404).json({ success: false, message: 'Processed feedback not found for the specified faculty' });
    }

    // Extract the faculty's question-wise ratings
    const { questionWiseRatings } = processedFeedback;

    // Initialize an array to store the question-wise ratings with questions
    const questionWiseRatingsWithQuestions = [];

    // Iterate over each question-wise rating
    for (const rating of questionWiseRatings) {
      const { QNO, averageRating } = rating;

      // Find the question corresponding to the question number (QNO)
      const question = await Question.findOne({ Qno: QNO });

      // If the question is found, add it to the array along with the average rating
      if (question) {
        questionWiseRatingsWithQuestions.push({ question: question.Question, averageRating });
      }
    }

    // Send the combined data to the client
    res.status(200).json({ success: true, questionWiseRatingsWithQuestions });
  } catch (error) {
    console.error('Error fetching question-wise ratings:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
};





module.exports = { importQuestions, changeQuestions, fetchQuestions, submitFeedback, calculateQuestionWiseRatings, getQuestionWiseRatings };