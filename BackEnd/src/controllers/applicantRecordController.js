const ApplicantRecordModel = require("../models/ApplicantRecordModel");
const ManagerFinalRecordModel = require("../models/ManagerFinalRecordModel");

// {
//     applicantId: { type: Number, required: true, match: /[A][1-9]\d{3}/ },
//     username: { type: String, required: true, minLength: 5, maxLenght: 15 },
//     priceIn: { type: Number, required: true },
//     timeIn: { type: Date, required: true },
//     priceOut: { type: Number, required: true },
//     timeOut: { type: Date, required: true },
//     managerA: { type: [ManagerASchema] },
//     managerB: { type: [ManagerBSchema] },
//     managerC: { type: [ManagerCSchema] },
//     created_at: { type: Date, default: Date.now },
// }

// {
//     grade: { type: Number, required: true, min: 0, max: 5 },
//     comment: { type: String, required: true, min: 0, max: 250 },
//     profile: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "LoginAuth",
//         required: true,
//     }
// }

const seedApplicant = async (req, res) => {
    try {
        await ApplicantRecordModel.deleteMany({});

        await ApplicantRecordModel.create([
            {
                _id: "660e0df3c050096882b8950b", // to check on object id
                applicantId: "A1000",
                username: "Adam",
                priceIn: 68930.0,
                timeIn: "2024-04-02T03:08:00.448Z",
                priceOut: 67118.0,
                timeOut: "2024-04-02T03:10:50.919Z",
                managers: [
                    {
                        staffId: "M20000",
                        grade: 4.5,
                        comment: "applicant priced out at the right time!",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                    {
                        staffId: "M30000",
                        grade: 4.0,
                        comment: "NA",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                    {
                        staffId: "M40000",
                        grade: 4.5,
                        comment: "expecting a lower price-in",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                ],
            },
            {
                _id: "660e0e74c050096882b8950d", // to check on object id
                applicantId: "A1000",
                username: "Adam",
                priceIn: 70380.0,
                timeIn: "2024-04-02T03:08:00.448Z",
                priceOut: 66272.57479,
                timeOut: "2024-04-02T03:10:50.919Z",
                managers: [
                    {
                        staffId: "M20000",
                        grade: 3.5,
                        comment:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat sodales gravida.",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                    {
                        staffId: "M30000",
                        grade: 4.0,
                        comment: "NA",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                    {
                        staffId: "M40000",
                        grade: 4.5,
                        comment:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat sodales gravida.",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                ],
            },
            {
                _id: "660e0ea3c050096882b8950f", // to check on object id
                applicantId: "A1000",
                username: "Adam",
                priceIn: 57748.0,
                timeIn: "2024-04-02T03:08:00.448Z",
                priceOut: 63829.8372,
                timeOut: "2024-04-02T03:10:50.919Z",
                managers: [
                    {
                        staffId: "M20000",
                        grade: 4.0,
                        comment:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat sodales gravida.",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                    {
                        staffId: "M30000",
                        grade: 3.0,
                        comment:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat sodales gravida.",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                    {
                        staffId: "M40000",
                        grade: 3.5,
                        comment: "test onearok jfodije i",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                ],
            },
            {
                _id: "660e0ecbc050096882b89511", // to check on object id
                applicantId: "A1000",
                username: "Adam",
                priceIn: 65943.38782,
                timeIn: "2024-04-02T03:08:00.448Z",
                priceOut: 67316.4872,
                timeOut: "2024-04-02T03:10:50.919Z",
                managers: [],
            },
            {
                _id: "660e0efbc050096882b89513", // to check on object id
                applicantId: "A2000",
                username: "Bryant",
                priceIn: 69394.9848,
                timeIn: "2024-04-02T03:08:00.448Z",
                priceOut: 65118.9248,
                timeOut: "2024-04-02T03:10:50.919Z",
                managers: [
                    {
                        staffId: "M30000",
                        grade: 2.0,
                        comment: "NA",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                    {
                        staffId: "M40000",
                        grade: 1.5,
                        comment:
                            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam placerat sodales gravida.",
                        // profile: "loginAuth ObjectId", // get the object id from loginAuth
                    },
                ],
            },
        ]);
        res.json({ status: "ok", msg: "seeding successful" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "seeding error" });
    }
};

// getting all applicants info
const getAllApplicantsRecords = async (req, res) => {
    try {
        const allApplicantsRecords = await ApplicantRecordModel.find().sort({
            applicantId: 1,
        });
        res.json(allApplicantsRecords);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting all applicants record ",
        });
    }
};

// getting records by applicant's id & manager's id
const getApplicantRecordsByApplicantId = async (req, res) => {
    try {
        const applicantRecords = await ApplicantRecordModel.find({
            applicantId: req.params.applicantId,
            // "managers.staffId": req.params.staffId,
        }).sort({ timeIn: 1 });
        if (!applicantRecords || applicantRecords.length === 0) {
            return res
                .status(400)
                .json({ status: "error", msg: "applicant Records not found" });
        }

        res.json({ applicantRecords });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting applicant's records",
        });
    }
};

// add new applicant record
const addNewApplicantRecord = async (req, res) => {
    try {
        const newRecord = new ApplicantRecordModel({
            applicantId: req.body.applicantId,
            username: req.body.username,
            priceIn: req.body.priceIn,
            timeIn: req.body.timeIn,
            priceOut: req.body.priceOut,
            timeOut: req.body.timeOut,
        });

        await ApplicantRecordModel.create(newRecord);

        res.json({ status: "ok", msg: "applicant trade record created" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "applicant trade record not created",
        });
    }
};

// update applicant record
const updateApplicantRecord = async (req, res) => {
    try {
        const updateApplicant = {};

        if ("applicantId" in req.body)
            updateApplicant.applicantId = req.body.applicantId;
        if ("username" in req.body)
            updateApplicant.username = req.body.username;
        if ("priceIn" in req.body) updateApplicant.priceIn = req.body.priceIn;
        if ("timeIn" in req.body) updateApplicant.timeIn = req.body.timeIn;
        if ("priceOut" in req.body)
            updateApplicant.priceOut = req.body.priceOut;
        if ("timeOut" in req.body) updateApplicant.timeOut = req.body.timeOut;

        await ApplicantRecordModel.findByIdAndUpdate(
            req.params.id,
            updateApplicant
        );

        return res.json({ status: "ok", msg: "applicant record updated" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating applicant",
        });
    }
};

// update manager's grade and comment
const updateApplicantManagerRecord = async (req, res) => {
    try {
        const updateManager = {
            staffId: req.body.staffId,
            grade: req.body.grade,
            comment: req.body.comment,
        };

        // check if manager's record is already in
        const existingRecord = await ApplicantRecordModel.findOne({
            _id: req.params.id,
            "managers.staffId": req.body.staffId,
        });

        // if exist, update the grade and comment of existing staffId
        if (existingRecord) {
            const response = await ApplicantRecordModel.updateOne(
                {
                    _id: req.params.id,
                    "managers.staffId": req.body.staffId,
                },
                {
                    $Set: {
                        "managers.staffId": req.body.staffId,
                        "managers.grade": req.body.grade,
                        "managers.comment": req.body.comment,
                    },
                }
            );

            return res.json({ status: "ok", msg: "manager grade updated" });
        }

        const response = await ApplicantRecordModel.updateOne(
            {
                _id: req.params.id,
            },
            {
                $addToSet: { managers: updateManager },
            }
        );

        return res.json({ status: "ok", msg: "manager grade updated" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "Error updating applicant record",
        });
    }
};

// delete an applicant record
const deleteApplicantRecord = async (req, res) => {
    try {
        await ApplicantRecordModel.findByIdAndDelete(req.params.id);
        res.json({ status: "ok", msg: "applicant deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error deleting applicant record",
        });
    }
};

// -----------------------------------------------------------------------------------------------------

// seed Managers final records
const seedManager = async (req, res) => {
    try {
        await ManagerFinalRecordModel.deleteMany({});

        await ManagerFinalRecordModel.create([
            {
                _id: "660e1865c050096882b89516", // to check on object id
                applicantId: "A1000",
                staffId: "M20000",
                finalGrade: 80,
                isRecommended: true,
            },
            {
                _id: "660e187fc050096882b89518", // to check on object id
                applicantId: "A2000",
                staffId: "M30000",
                finalGrade: 78,
                isRecommended: true,
            },
            {
                _id: "660e1892c050096882b8951a", // to check on object id
                applicantId: "A1000",
                staffId: "M40000",
                finalGrade: 50,
                isRecommended: false,
            },
        ]);
        res.json({ status: "ok", msg: "seeding successful" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({ status: "error", msg: "seeding error" });
    }
};

// getting all managers final records info
const getAllManagersFinalRecords = async (req, res) => {
    try {
        const allManagersFinalRecordsByApplicantId =
            await ManagerFinalRecordModel.find().sort({ staffId: 1 });
        res.json(allManagersFinalRecordsByApplicantId);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting all managers final record ",
        });
    }
};

// getting manager final record by applicant Id
const getManagersFinalRecordsByApplicantId = async (req, res) => {
    try {
        const allManagersFinalRecords = await ManagerFinalRecordModel.find({
            applicantId: req.params.applicantId,
        }).sort({ applicantId: 1 });
        res.json(allManagersFinalRecords);
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error getting all managers final record ",
        });
    }
};

// adding record
const addNewManagersRecord = async (req, res) => {
    try {
        const managerRecord = await ManagerFinalRecordModel.find({
            applicantId: req.body.applicantId,
            staffId: req.body.staffId,
        });

        console.log(managerRecord);

        if (managerRecord.length > 0) {
            return res.json({
                status: "error",
                msg: "applicant manager records already exist!",
            });
        }

        const applicantManagerRecord = await ApplicantRecordModel.find({
            applicantId: req.body.applicantId,
            staffId: req.body.staffId,
        });

        const gradeSum = 0;
        if (applicantManagerRecord.length > 0) {
            gradeSum = calculateGradeSumByManager(
                applicantManagerRecord,
                req.body.staffId
            );
        }

        const newRecord = new ManagerFinalRecordModel({
            applicantId: req.body.applicantId,
            staffId: req.body.staffId,
            finalGrade: gradeSum,
            isRecommended: req.body.isRecommended,
        });

        await ManagerFinalRecordModel.create(newRecord);
        res.json({ status: "ok", msg: "manager final record created" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error creating manager final record ",
        });
    }
};

// updating managers final record
const updateManagerFinalRecord = async (req, res) => {
    try {
        const updateManagerRecord = {};
        const existingRecord = await ManagerFinalRecordModel.findById(
            req.params.id
        );

        if (existingRecord.length === 0) {
            return res.json({
                status: "error",
                msg: "manager final record not found!",
            });
        }

        if ("applicantId" in req.body && "staffId" in req.body) {
            const applicantManagerRecord = await ApplicantRecordModel.find({
                applicantId: req.body.applicantId,
                "managers.staffId": req.body.staffId,
            });

            console.log(`1. : ${applicantManagerRecord}`);
            if (applicantManagerRecord.length === 0) {
                return res.json({
                    status: "error",
                    msg: "no applicant manager records found",
                });
            }

            let gradeSum = 0;
            if (applicantManagerRecord.length > 0) {
                gradeSum = calculateGradeSumByManager(
                    applicantManagerRecord,
                    req.body.staffId
                );
            }

            console.log("after calculation")
            updateManagerRecord.applicantId = req.body.applicantId;
            updateManagerRecord.staffId = req.body.staffId;
            updateManagerRecord.finalGrade = gradeSum;
            if ("isRecommended" in req.body) {
                updateManagerRecord.isRecommended = req.body.isRecommended;
            }
        }

        // if ("applicantId" in req.body && !("staffId" in req.body)) {
        //     const applicantManagerRecord = await ManagerFinalRecordModel.find({
        //         applicantId: req.body.applicantId,
        //         staffId: existingRecord.staffId,
        //     });

        //     console.log(`2. : ${applicantManagerRecord}`)
        //     if (applicantManagerRecord.length === 0) {
        //         return res.json({
        //             status: "error",
        //             msg: "no applicant manager records found",
        //         });
        //     }

        //     const gradeSum = calculateGradeSumByManager(
        //         applicantManagerRecord,
        //         existingRecord.staffId
        //     );

        //     updateManagerRecord.applicantId = req.body.applicantId;
        //     updateManagerRecord.grade = gradeSum;
        //     updateManagerRecord.isRecommended = req.body.isRecommended;
        // }

        // if (!("applicantId" in req.body) && "staffId" in req.body) {
        //     const applicantManagerRecord = await ManagerFinalRecordModel.find({
        //         applicantId: existingRecord.applicantId,
        //         staffId: req.body.staffId,
        //     });

        //     console.log(`3. : ${applicantManagerRecord}`)
        //     if (applicantManagerRecord.length === 0) {
        //         return res.json({
        //             status: "error",
        //             msg: "no applicant manager records found",
        //         });
        //     }

        //     const gradeSum = calculateGradeSumByManager(
        //         applicantManagerRecord,
        //         req.body.staffId
        //     );

        //     updateManagerRecord.staffId = req.body.staffId;
        //     updateManagerRecord.grade = gradeSum;
        //     updateManagerRecord.isRecommended = req.body.isRecommended;
        // }

        console.log(JSON.stringify(updateManagerRecord))
        await ManagerFinalRecordModel.findByIdAndUpdate(
            req.params.id,
            updateManagerRecord
        );

        res.json({ status: "ok", msg: "manager final record updated" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error updating manager final record",
        });
    }
};

// delete manager record
const deleteManagerFinalRecord = async (req, res) => {
    try {
        await ManagerFinalRecordModel.findByIdAndDelete(req.params.id);
        res.json({ status: "ok", msg: "applicant deleted" });
    } catch (error) {
        console.error(error.message);
        res.status(400).json({
            status: "error",
            msg: "error deleting applicant record",
        });
    }
};

// functions
const calculateGradeSumByManager = (applicantManagerRecords, staffId) => {
    let gradeSum = 0;
    // const managerArray = [];
    for (const record of applicantManagerRecords) {
        console.log(staffId);
        // console.log(`in calculation: ${record}`);
        record.managers.forEach((manager) => {
            if (manager.staffId === staffId) gradeSum += manager.grade;
        });
    }
    console.log(gradeSum)
    return gradeSum;
};

module.exports = {
    seedApplicant,
    getAllApplicantsRecords,
    getApplicantRecordsByApplicantId,
    addNewApplicantRecord,
    updateApplicantRecord,
    updateApplicantManagerRecord,
    deleteApplicantRecord,
    seedManager,
    getAllManagersFinalRecords,
    getManagersFinalRecordsByApplicantId,
    addNewManagersRecord,
    updateManagerFinalRecord,
    deleteManagerFinalRecord,
};
