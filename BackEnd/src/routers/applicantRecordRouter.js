const express = require("express");
const {
    seedApplicant,
    seedManager,
    seedGeneralManager,
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
    getAllGeneralManagersRecords,
    getGeneralManagersRecordsByApplicantId,
    addNewGeneralManagerRecord,
    updateGeneralManagerRecord,
    deleteGeneralManagerRecord,
    seedGeneralManagerRecords,
} = require("../controllers/applicantRecordController");

const { authManager, authGeneralManager } = require("../middleware/auth");

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

router.get("/seedGeneralManager", seedGeneralManager);
router.get("/generalManagers", getAllGeneralManagersRecords);
router.get(
    "/generalManagers/:applicantId",
    getGeneralManagersRecordsByApplicantId
);
router.post("/generalManagers", addNewGeneralManagerRecord);
router.patch("/generalManagers/:id", updateGeneralManagerRecord);
router.delete("/generalManagers/:id", deleteGeneralManagerRecord);

// router.get("/seedApplicant", authManager, seedApplicant);
// router.get("/applicants", authManager, getAllApplicantsRecords);
// router.get("/applicants/:applicantId", authManager, getApplicantRecordsByApplicantId);
// router.post("/applicants", authManager, addNewApplicantRecord);
// router.patch("/applicants/:id", authManager, updateApplicantRecord);
// router.patch("/applicants/manager/:id", authManager, updateApplicantManagerRecord);
// router.delete("/applicants/:id", authManager, deleteApplicantRecord);

// router.get("/seedManager", authManager, seedManager);
// router.get("/managers", authManager, getAllManagersFinalRecords);
// router.get("/managers/:applicantId", authManager, getManagersFinalRecordsByApplicantId);
// router.post("/managers", authManager, addNewManagersRecord);
// router.patch("/managers/:id", authManager, updateManagerFinalRecord);
// router.delete("/managers/:id", authManager, deleteManagerFinalRecord);

// router.get("/seedGeneralManager", authGeneralManager, seedGeneralManager);
// router.get("/generalManagers", authGeneralManager, getAllGeneralManagersRecords);
// router.get(
//     "/generalManagers/:applicantId", authGeneralManager,
//     getGeneralManagersRecordsByApplicantId
// );
// router.post("/generalManagers", authGeneralManager, addNewGeneralManagerRecord);
// router.patch("/generalManagers/:id", authGeneralManager, updateGeneralManagerRecord);
// router.delete("/generalManagers/:id", authGeneralManager, deleteGeneralManagerRecord);

module.exports = router;
