const Control = require('../models/control.model');
const Audit = require('../models/audit.model');

exports.createControl = async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate } = req.body;

        if (!title) return res.status(400).json({ messageassignedTo: 'title is required' });

        const control = await Control.create({ title, description, assignedTo, dueDate });
        // Log audit
        await Audit.create({
            action: 'New Control Created',
            performedBy: req.user.id,
            details: `New control "${title}" created by --> ${req.user.id}`
        });
        res.status(201).json({ message: 'Control created', control });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.editControl = async (req, res) => {
    try {
        const { controlId } = req.params;
        const {
            title,
            description,
            status,
            assignedTo,
            dueDate
        } = req.body;

        const control = await Control.findById(controlId);
        if (!control) return res.status(404).json({ message: 'Control not found' });

        // Update only if fields are provided
        if (title) control.title = title;
        if (description) control.description = description;
        if (status) control.status = status;
        if (assignedTo) control.assignedTo = assignedTo;
        if (dueDate) control.dueDate = dueDate;

        await control.save();

        // Log Audit
        await Audit.create({
            action: 'Edit Control',
            performedBy: req.user.id,
            details: `Control "${control.title}" updated by Admin`
        });

        res.status(200).json({ message: 'Control updated successfully', control });
    } catch (err) {
        res.status(500).json({ message: 'Failed to edit control', error: err.message });
    }
};
