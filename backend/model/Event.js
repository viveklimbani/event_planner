const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let Event = new Schema({
    eventname: {
        type: String
    },
    description: {
        type: String
    },
    startDate: {
        type: String
    },
    endDate: {
        type: String
    },
    recurrenceType: {
        type: String
    }
}, {
    collection: 'events'
})

module.exports = mongoose.model('Event', Event)