# Telegram Premiership Rugby Bot

![Travis](https://travis-ci.org/bobbyshaw/bathrugby_bot.svg)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/2b80a2431bd949298419db4bfb2a59d5)](https://www.codacy.com/app/tar20_154/bathrugby_bot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bobbyshaw/bathrugby_bot&amp;utm_campaign=Badge_Grade)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/2b80a2431bd949298419db4bfb2a59d5)](https://www.codacy.com/app/tar20_154/bathrugby_bot?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=bobbyshaw/bathrugby_bot&amp;utm_campaign=Badge_Coverage)

This telegram chat bot will fetch results, fixture, and table information for Premiership Rugby teams.

It uses [IBM Watson Conversation API](https://www.ibm.com/watson/developercloud/conversation.html) to understand intents and entities.
It uses [Drop22 API](https://api.drop22.net/) to fetch results, fixtures and table information.

Defaults to Bath Rugby 🔵⚫️⚪️.

Example conversation:

![Conversation](https://pbs.twimg.com/media/CszH7XPWIAAP7qy.jpg)

## Usage

There are some environment variables that are expected.  Use `.env.example` to see what these are. Either ensure they are available or copy and complete into a `.env` file which will automatically be read.

## Other Teams

In theory, this chat bot can be re-purposed to work with other teams by instantiating rugbybot with one of the following team names:

- northampton saints
- exeter chiefs
- saracens
- bath rugby
- leicester tigers
- wasps
- sale sharks
- harlequins
- gloucester rugby
- newcastle falcons
- bristol rugby
- worcester warriors


## Production

This bot is running in production on IBM Bluemix and can be spoken to or invited to a telegram group chat. The username is "bathrugby_bot".

The first request may be slow as Drop22 is on a Heroku free dyno so will take a second to boot up.

## Development

### Testing

Mocha, Sinon and Chai are used to provide test coverage.

`npm tests`

To generate the HTML code coverage report in ./coverage, run:

`npm run coverage`
