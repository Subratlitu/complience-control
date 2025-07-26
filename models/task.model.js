const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        control: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Control',
            required: true
        },
        assignedTo: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        status: {
            type: String,
            enum: ['pending', 'in-progress', 'completed'],
            default: 'pending'
        },
        comment: {
            type: String
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Task', taskSchema);
