import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

// Set default NODE_ENV if not provided
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Debug middleware to log all requests
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('\n=== New Request ===');
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Body:', JSON.stringify(req.body, null, 2));
  next();
});

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Error: MONGODB_URI is not defined in the .env file');
  process.exit(1);
}

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB successfully');
    console.log('MongoDB URI:', MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'));
  })
  .catch((err: Error) => {
    console.error('MongoDB connection error:', err);
    console.error('Connection details:', {
      uri: MONGODB_URI.replace(/\/\/[^:]+:[^@]+@/, '//****:****@'),
      error: err.message,
      name: err.name
    });
  });

// Survey Response Schema
const surveyResponseSchema = new mongoose.Schema({
  userInfo: {
    fullName: String,
    email: String,
  },
  responses: [{
    questionId: String,
    answer: mongoose.Schema.Types.Mixed
  }],
  submittedAt: {
    type: Date,
    default: Date.now
  }
});

const SurveyResponse = mongoose.model('SurveyResponse', surveyResponseSchema, 'TichiSurveyResponses');

// Validation middleware
const validateSurveySubmission = (req: Request, res: Response, next: NextFunction) => {
  console.log('\n=== Validating Survey Submission ===');
  
  const { userInfo, responses } = req.body;
  
  // Check if required fields exist
  if (!userInfo || !responses) {
    console.error('Missing required fields:', { userInfo: !!userInfo, responses: !!responses });
    return res.status(400).json({ 
      error: 'Invalid request body',
      details: 'Request must include userInfo and responses'
    });
  }

  // Validate userInfo
  if (!userInfo.fullName || !userInfo.email) {
    console.error('Invalid userInfo:', userInfo);
    return res.status(400).json({
      error: 'Invalid userInfo',
      details: 'userInfo must include fullName and email'
    });
  }

  // Validate responses
  if (!Array.isArray(responses) || responses.length === 0) {
    console.error('Invalid responses:', responses);
    return res.status(400).json({
      error: 'Invalid responses',
      details: 'responses must be a non-empty array'
    });
  }

  // Validate each response
  for (const response of responses) {
    if (!response.questionId || response.answer === undefined) {
      console.error('Invalid response object:', response);
      return res.status(400).json({
        error: 'Invalid response object',
        details: 'Each response must include questionId and answer'
      });
    }
  }

  console.log('Validation passed');
  next();
};

// Routes
app.post('/api/survey/submit', validateSurveySubmission, async (req: Request, res: Response) => {
  try {
    console.log('\n=== Processing Survey Submission ===');
    console.log('Request body:', JSON.stringify(req.body, null, 2));

    // Check MongoDB connection
    if (mongoose.connection.readyState !== 1) {
      console.error('MongoDB not connected. Current state:', mongoose.connection.readyState);
      return res.status(500).json({ 
        error: 'Database connection not ready',
        details: `MongoDB connection state: ${mongoose.connection.readyState}`
      });
    }

    const surveyResponse = new SurveyResponse(req.body);
    console.log('Created survey response object:', JSON.stringify(surveyResponse, null, 2));

    const savedResponse = await surveyResponse.save();
    console.log('Successfully saved response:', JSON.stringify(savedResponse, null, 2));

    res.status(201).json({ 
      message: 'Survey response saved successfully',
      data: savedResponse
    });
  } catch (error: any) {
    console.error('\n=== Error Saving Survey Response ===');
    console.error('Error details:', {
      name: error.name,
      message: error.message,
      code: error.code,
      stack: error.stack
    });

    // Handle specific MongoDB errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        error: 'Validation Error',
        details: Object.values(error.errors).map((err: any) => err.message)
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        error: 'Duplicate Entry',
        details: 'A survey response with this information already exists'
      });
    }

    res.status(500).json({ 
      error: 'Failed to save survey response',
      details: error.message
    });
  }
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('\n=== Unhandled Error ===');
  console.error('Error details:', {
    name: err.name,
    message: err.message,
    stack: err.stack
  });

  res.status(500).json({
    error: 'Internal server error',
    details: err.message
  });
});

const PORT = parseInt(process.env.PORT || '5000', 10);
app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n=== Server Started ===`);
  console.log(`Server running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`MongoDB Status: ${mongoose.connection.readyState === 1 ? 'Connected' : 'Disconnected'}`);
}); 