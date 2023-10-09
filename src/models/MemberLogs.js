const { Schema, model } = require('mongoose');

const memberLogsSchema = new Schema({
  guildId: {
    type: String,
    required: true,
    unique: true,
  },
  channelId: {
    type: String,
    required: true,
  },
});

module.exports = model('MemberLogs', memberLogsSchema);
