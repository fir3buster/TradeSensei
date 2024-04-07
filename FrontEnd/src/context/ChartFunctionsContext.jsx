import React from "react";

const ChartFunctionsContext = React.createContext({
  nextPage: () => {},
  prevPage: () => {},
  resetRateAndComment: () => {},
});

export default ChartFunctionsContext;
