import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user
    reportType: {
      type: String,
      enum: ['blood', 'cholesterol', 'diabetes'], // Major report types
      required: true
    },
  
    healthMetrics: {
      // Blood Test Report Metrics
      hemoglobin: { type: Number, default: 0 },
      bloodPressure: { type: String, default: '0/0' }, 
      whiteBloodCellCount: { type: Number, default: 0 },
      redBloodCellCount: { type: Number, default: 0 }, 
      plateletCount: { type: Number, default: 0 }, 
  
      // Cholesterol Report Metrics
      totalCholesterol: { type: Number, default: 0 },
      hdlCholesterol: { type: Number, default: 0 }, 
      ldlCholesterol: { type: Number, default: 0 },
      triglycerides: { type: Number, default: 0 }, 
  
      // Diabetes Report Metrics
      bloodSugarLevels: { type: Number, default: 0 }, 
      hba1c: { type: Number, default: 0 }, 
      insulinLevels: { type: Number, default: 0 }, 
      cPeptide: { type: Number, default: 0 }, 
  
      // General Metrics (for all report types)
      weight: { type: Number, default: 0 }, 
      height: { type: Number, default: 0 }, 
      bmi: { type: Number, default: 0 },
      age: { type: Number, default: 0 }, 
    },
  
    dateUploaded: { type: Date, default: Date.now }
  });
  
  export const Report = mongoose.models.Report || mongoose.model('Report', reportSchema);
  