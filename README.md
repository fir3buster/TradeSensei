# TradeSensei

![Prototype](https://github.com/fir3buster/TradeSensei/blob/main/img/prototype1.png?raw=true)

# Start Program Now!
[online](vercel app)

#App Description
a trading chart with novice trader's trade to be evaluated by senior trader

# Problem 
senior trader not able to visually pull out historical trade for review

# Tech Stack
React, JavaScript, HTML, CSS, Api (websocket / airtable)

# Advantages
- Rather than be graded by a single portfolio value, junior traders are graded by their all their trade periodically.
- Reputable or legendary traders could sign up and grace their presence to grade these junior traders, giving the junior traders a boost in confidence
- Visual presentation for top to middle management to review junior traders

# Solution
App with a trading chart, supplement with entry and exit position.
A facebook style journal to collect senior trader’s advices/comments

# How To Use
Before the interview, the junior traders send their crypto exchange api (readonly access) to the HR of the trading firm they want to apply to.
HR will key in the API secret key to gain access to the junior trader's last 2 year trade records.  Three managers within the firm will grade each trader's using our TradeSensei app by giving marks and comments, all in privacy.  Only the GM will be able to read the three managers' comments and grade, and recommendation for hiring.  The GM, being the top management, will process to choose and inform the HR of the result.

# Output
grades by trading managers.

# Planned future enhancements (icebox items)
- connect to all other crypto exchange api
- expand functionality to be able to conduct trading competition
- revenue could include volume based as winning citeria for boosting trading volume of certain new tokens (you need to keep winning to continue to trade in volume, with % from base volume and not from absolute figures)

# Challenges
1) different crypto exchange have different json output format
2) setting up a dummy binance api server

# Reference
- documentation from lightweight tradingview https://tradingview.github.io/lightweight-charts/docs
- Lightweight Charts Tutorial - Creating a Basic Chart | Trading View | Geniobits | Imran Kabir https://www.youtube.com/watch?v=zxhWjV1-AyE&list=PLwnDHoBU_EKY_xauZ6bvZt7z6rgmH7EHj

