const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/open_mic_db', { useNewUrlParser: true, useUnifiedTopology: true });

const openMicSchema = new mongoose.Schema({
    day: String,
    mic_name: String,
    location: String,
    address: String,
    sign_up_time_notes: String,
    start_time: String
});

const OpenMicEvent = mongoose.model('OpenMicEvent', openMicSchema);

const sampleData = [
    {
        day: "Monday",
        mic_name: "Laugh Out Loud",
        location: "Comedy Club",
        address: "123 Main St, Chicago, IL",
        sign_up_time_notes: "7:00 PM, arrive early",
        start_time: "8:00 PM"
    },
    {
        day: "Tuesday",
        mic_name: "Funny Tuesdays",
        location: "Bar & Grill",
        address: "456 Oak St, Chicago, IL",
        sign_up_time_notes: "6:30 PM, online sign-up available",
        start_time: "7:30 PM"
    },
    // Add more sample data as needed
];

OpenMicEvent.insertMany(sampleData)
    .then(() => {
        console.log("Sample data inserted");
        mongoose.connection.close();
    })
    .catch(error => {
        console.error("Error inserting sample data:", error);
    });
