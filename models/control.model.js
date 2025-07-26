const mongoose = require('mongoose');

const controlSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['pending', 'in-progress', 'complete'], default: 'pending' },
    assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    dueDate: { type: Date }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Control', controlSchema);
