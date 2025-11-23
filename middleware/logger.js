const ActivityLog = require('../models/ActivityLog');

const logActivity = (action, details = '') => {
  return async (req, res, next) => {
    try {
      await ActivityLog.create({
        action,
        details,
        userId: req.user?._id
      });
    } catch (error) {
      console.error('Logging error:', error);
    }
    next();
  };
};

module.exports = logActivity;