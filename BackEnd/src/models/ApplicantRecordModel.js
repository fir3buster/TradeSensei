const mongoose = require("mongoose");

const generateId = "A" + Math.floor(Math.random() * 10000);

const ManagerSchema = new mongoose.Schema({
    staffId: { type: String, require: true, match: /[M][1-9]\d{4}/ },
    grade: { type: Number, require: true, min: 0, max: 5 },
    comment: { type: String, require: true, min: 0, max: 250 },
    // profile: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "LoginAuth",
    //     required: true,
    // },
});

// const ManagerBSchema = new mongoose.Schema({
//     grade: { type: Number, required: true, min: 0, max: 5 },
//     comment: { type: String, required: true, min: 0, max: 250 },
//     profile: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "LoginAuth",
//         required: true,
//     },
// });

// const ManagerCSchema = new mongoose.Schema({
//     grade: { type: Number, required: true, min: 0, max: 5 },
//     comment: { type: String, required: true, minLength: 0, maxLength: 250 },
//     profile: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "LoginAuth",
//         required: true,
//     },
// });

const ApplicantRecordSchema = new mongoose.Schema(
    {
        pageNumber: {type: Number, require: true},
        applicantId: {
            type: String,
            match: /[A][1-9]\d{3}/,
            default: generateId,
        },
        // applicantName: { type: String, require: true, minLength: 3, maxLength: 15 },
        executedQty: { type: Number, require: true },
        tradeType: { type: String, require:true, enum:["long", "short"]},
        priceIn: { type: Number, require: true },
        timeIn: { type: Date, require: true },
        priceOut: { type: Number, require: true },
        timeOut: { type: Date, require: true },
        managers: { type: [ManagerSchema] },
        created_at: { type: Date, default: Date.now },
    },
    {
        collection: "applicantsRecords",
    }
);

module.exports = mongoose.model("ApplicantsRecords", ApplicantRecordSchema);
