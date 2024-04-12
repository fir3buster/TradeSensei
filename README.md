# TradeSensei
# Background
TradeSensei App is a trading chart with novice trader's trade to be evaluated by senior trader

### Problem 
The senior trader is unable to visually retrieve historical trades for review

### Advantages
- Instead of being assessed based solely on portfolio value, junior traders are periodically graded on all of their trades.
- Reputable or legendary traders have the opportunity to sign up and attend, lending their presence to grade these junior traders, thereby providing them with a confidence boost.
- Visual presentation for top to middle management to review junior traders.

### Solution
An application featuring a trading chart supplemented by entry and exit positions, along with a journal resembling Facebook's style to gather advice and comments from senior traders.

### How To Use
Before the interview, the junior traders send their crypto exchange api (readonly access) to the HR of the trading firm they want to apply to.
HR will key in the API secret key to gain access to the junior trader's last 2 year trade records.  Three managers within the firm will grade each trader's using our TradeSensei app by giving marks and comments, all in privacy.  Only the GM will be able to read the three managers' comments and grade, and recommendation for hiring.  The GM, being the top management, will process to choose and inform the HR of the result.

# Screenshots
![Prototype](https://github.com/fir3buster/TradeSensei/blob/main/img/prototype1.png?raw=true)

![Working](https://github.com/fir3buster/TradeSensei/blob/main/img/pre-presentation1.png?raw=true)

![Register](https://github.com/fir3buster/TradeSensei/blob/develop/img/1_register.png?raw=true)

![ManagerGrade](https://github.com/fir3buster/TradeSensei/blob/develop/img/2_managergrade.png?raw=true)

![Submit](https://github.com/fir3buster/TradeSensei/blob/develop/img/3_submit.png?raw=true)

![FinalScore](https://github.com/fir3buster/TradeSensei/blob/develop/img/4_finalscore.png?raw=true)

![Recommend](https://github.com/fir3buster/TradeSensei/blob/develop/img/5_recommend.png?raw=true)

![GwView](https://github.com/fir3buster/TradeSensei/blob/develop/img/6_gmview.png?raw=true)

![GmRecommend](https://github.com/fir3buster/TradeSensei/blob/develop/img/7_gmrecommend.png?raw=true)

<!-- # Start Program Now!
[online](vercel app) -->

# Technologies Used
<div>
    <img src="./img/javascript.png" alt="JavaScript" width="50" height="50">
    <img src="./img/react.png" alt="React" width="50" height="50">
    <img src="./img/css.png" alt="CSS" width="50" height="50">
    <img src="./img/html.png" alt="HTML" width="50" height="50">
    <img src="./img/mongoDB.png" alt="MongoDB" width="50" height="50">
    <img src="./img/expressjs.png" alt="ExpressJS" width="50" height="50">
    <img src="./img/nodejs.png" alt="NodeJS" width="50" height="50">
</div>

# Getting Started
- [Public Board](https://junxiulow.atlassian.net/jira/software/projects/TRD/boards/3)
- [Pitch Deck](https://docs.google.com/presentation/d/1JP4o74ilLmReu8Bxw2ohCwJlNCng1KS2KDnuBZUAibM/edit#slide=id.g26c376b6b4e_1_54)

![EntityRelationshipDiagram](https://github.com/fir3buster/TradeSensei/blob/develop/img/ERD.png?raw=true)

# App Design

The frontend has ChartDisplay.jsx and Score.jsx as the two main components that make up what’s seen and used the most in the app. The ChartDisplay.jsx component is housed by the ChartScore.jsx component, and the Score.jsx component is housed within the ChartDisplay.jsx. Data is passed through App.jsx using the useState and useContext methods, so that the chart’s two buttons(Prev Chart and Next Chart for toggling between the 10 charts), are connected to the scoring system found in the Score.jsx. So when the senior traders submit their score using this grading and comment system, each page of the ChartDisplay.jsx charts are connected to the scoring system and the backend endpoints found in the Score.jsx component.

The Score.jsx further has two components that are connected to it, FinalScore.jsx and GmScore.jsx. FinalScore.jsx is displayed when the ‘Submit All Scores’ button is triggered on the last page/chart(page 10), to show the final score tallied up from all previous scores for the particular applicant by the manager. GmScore.jsx is shown only to roles that log in with the General Manager authentication, and the component displays the particular applicant’s final grades(from FinalScore.jsx) by all managers who graded him/her, and whether the managers have recommended the applicant or not. The GM has the final say in recommending or not recommending the applicant. 

The backend comprises three main components: an authentication system, an Applicant Management and Assessment system, and a chart visualization module.

The authentication system handles user registration, login, and user data retrieval. The 'getAllUsers' function efficiently retrieves user data from the database, packaging it into a JSON array containing email, staff ID, and role details. During registration, it ensures email uniqueness, encrypts passwords using bcrypt, and assigns a default role of "manager" if not specified. The 'login' function validates user credentials, issuing JWT tokens upon successful authentication or returning appropriate error messages with status codes 400 or 401 if authentication fails.

The Applicant Management and Assessment system manages applicant records in a database, with added functionality for managing managers' assessments of applicants. It covers CRUD operations on applicant records and provides functionality for managing manager final records and general manager records. These functions ensure data integrity and efficient management, offering clear JSON responses for successful or failed operations. Additionally, a helper function, calculateGradeSumByManager, aids in the assessment process by calculating the sum of grades provided by managers for each applicant.

As for the chart, we are using lightweight-charts which is the free version of the tradingview.  To plot the applicant's trade, we will need the API key to gain access to the binance testnet which holds the applicant's trade.  Upon retreival of these trade data, we use another api from ccxt library to get the daily OHLCV price data (Open High Low Close Volume).  Example would be to start fetching data from 1st March 2024 to 15th March 2024 if one of applicant open trades on 5th and close the trade on 10th, thereby giving a buffer.  fetching a bigger range of data would be recommended as the manager could resize and look at the "bigger picture" of the trades.  2 trades (open and close trades) constitute 1 page of the applicant's data.  A demo of 2 applicants with 10 pages each, are created.  The open trade will be shown by both a horizontal price line and a marker that are positioned at the open trade's date.  The same goes for the close trade.  A profit or loss statement will be shown on the price chart too.

# Planned future enhancements (icebox items)
- Connect to all other crypto exchange api
- Expand functionality to be able to conduct trading competition
- Revenue could include volume based as winning citeria for boosting trading volume of certain new tokens (you need to keep winning to continue to trade in volume, with % from base volume and not from absolute figures)
- Password changing
- Manager is able to edit submitted scores for candidates
- The final score will be totalled after all cycles are graded, and I can edit this final score if I want to
- Everytime a score is submitted, the user will be notified through a message in the scoreboard
- Add validations so that when there’s missing scores and comments, graders are directed to the pages


# Challenges
1) different crypto exchange have different json output format
2) setting up a dummy binance api server
3) Updating record schemas (applicant, manager, general manager) to reference the staffId from the LoginAuth schema enables the establishment of relationships between different records in the MongoDB database, fostering data integrity and streamlined querying. By associating records with the staffId from LoginAuth, it creates a cohesive linkage among entities, facilitating more efficient data management and analysis processes
4) Connecting the chart’s buttons to the score component and setting the scores to the backend was a challenge to figure out. The importance of having a really clear understanding of how the backend will work with the frontend overall before creating components and coding


# Reference
1) documentation from lightweight tradingview [https://tradingview.github.io/lightweight-charts/docs]
2) Lightweight Charts Tutorial - Creating a Basic Chart | Trading View | Geniobits | Imran Kabir [https://www.youtube.com/watch?v=zxhWjV1-AyE&list=PLwnDHoBU_EKY_xauZ6bvZt7z6rgmH7EHj]
3) the search to use tradingview, inspired by Kenneth Quek use of echart
[https://tradingview.github.io/lightweight-charts/docs]
[https://www.youtube.com/watch?v=zxhWjV1-AyE]


