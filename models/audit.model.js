const mongoose = require('mongoose');

const auditSchema = new mongoose.Schema(
    {
        action: { type: String, required: true },
        performedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        details: { type: String },
        timestamp: {
            type: Date,
            default: Date.now
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Audit', auditSchema);
