const Task = require('../models/task.model');
const Audit = require('../models/audit.model');
exports.assignTask = async (req, res) => {
    try {
        const { title, controlId, assignedTo } = req.body;

        if (!title || !controlId || !assignedTo)
            return res.status(400).json({ message: 'title, controlId, and assignedTo are required' });

        const task = await Task.create({ title, control: controlId, assignedTo });

        // Log audit
        await Audit.create({
            action: 'Assign Task',
            performedBy: req.user.id,
            details: `Assigned task "${title}" to user ${assignedTo} for control ${controlId}`
        });

        res.status(201).json({ message: 'Task assigned', task });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};
exports.completeTask = async (req, res) => {
    try {
        const taskId = req.params.taskId;
        const { status, comment } = req.body;

        const task = await Task.findById(taskId);

        if (!task) return res.status(404).json({ message: 'Task not found' });

        // Ensure the logged-in user is the one assigned
        if (task.assignedTo.toString() !== req.user.id)
            return res.status(403).json({ message: 'Not allowed to update this task' });

        task.status = status || task.status;
        task.comment = comment || task.comment;
        await task.save();

        // Log audit
        await Audit.create({
            action: 'Update Task',
            performedBy: req.user.id,
            details: `Updated task ${taskId} with comment: ${comment}`
        });

        res.status(200).json({ message: 'Task updated', task });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

exports.getTasks = async (req, res) => {
    try {
        const filter = {};

        // If user is Employee, only fetch their own tasks else all tasks
        if (req.user.role === 'Employee') {
            filter.assignedTo = req.user.id;
        }

        const tasks = await Task.find(filter)
            .populate('control', 'title status')
            .populate('assignedTo', 'name email role');

        res.status(200).json({ tasks });
    } catch (err) {
        res.status(500).json({ message: 'Failed to fetch tasks', error: err.message });
    }
};

