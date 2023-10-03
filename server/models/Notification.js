const { Schema, model } = require('mongoose');

const notificationSchema = new Schema({
  recipient: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  sender: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
  },
  type: {
      type: String,
      enum: ['FRIEND_REQUEST', 'MESSAGE', /* other types */],
      required: true
  },
  content: {
      type: String,
      required: true
  },
  isRead: {
      type: Boolean,
      default: false
  },
  createdAt: {
      type: Date,
      default: Date.now
  }
});

const Notification = model('Notification', notificationSchema);

module.exports = Notification;
