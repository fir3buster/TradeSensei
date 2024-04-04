const express = require("express");

const { getFullRangeOfPriceChart, seedApplicant } = require("../controllers/extractionOfDataFromBinanceFuturesAPI")
const router = express.Router();

router.get('/tradeData', getFullRangeOfPriceChart)


// router.get("/tradeData", getAllAppointments)
// router.post("/tradeData", getAppointmentById)
// router.put ("/tradeData", addNewAppointment)
// router.delete("/tradeData/:id", removeAppointment)
// router.patch("/tradeData/:id", updateAppointment)

module.exports=router;
