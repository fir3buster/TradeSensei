const express = require("express");
const {
    seedApplicant,
    seedManager,
    getAllApplicantsRecords,
    getApplicantRecordsByApplicantId,
    addNewApplicantRecord,
    updateApplicantRecord,
    updateApplicantManagerRecord,
    getAllManagersFinalRecords,
    getManagersFinalRecordsByApplicantId,
    updateManagerFinalRecord,
    deleteManagerFinalRecord,
    addNewManagersRecord,
    deleteApplicantRecord,
} = require("../controllers/applicantRecordController");

const router = express.Router();

router.get("/seedApplicant", seedApplicant);
router.get("/applicants", getAllApplicantsRecords);
router.get("/applicants/:applicantId", getApplicantRecordsByApplicantId);
router.post("/applicants", addNewApplicantRecord);
router.patch("/applicants/:id", updateApplicantRecord);
router.patch("/applicants/manager/:id", updateApplicantManagerRecord);
router.delete("/applicants/:id", deleteApplicantRecord);

router.get("/seedManager", seedManager);
router.get("/managers", getAllManagersFinalRecords);
router.get("/managers/:applicantId", getManagersFinalRecordsByApplicantId);
router.post("/managers", addNewManagersRecord);
router.patch("/managers/:id", updateManagerFinalRecord);
router.delete("/managers/:id", deleteManagerFinalRecord);

module.exports = router;
