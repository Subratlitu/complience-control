const Audit = require('../models/audit.model');

exports.getAuditLogs = async (req, res) => {
    try {
        const logs = await Audit.find()
            .populate('performedBy', 'name email role')
            .sort({ createdAt: -1 });

        res.status(200).json({ logs });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching audit logs', error: err.message });
    }
};
