# BeFit

BeFit is the fitness tracker that works! You name it we have it! Stats? You got it! Meditation? That too! 800+ Workouts? Definitely!


## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)

[![Vercel](http://therealsujitk-vercel-badge.vercel.app/?app=befit)](https://befit-tracker.vercel.app)

## Screenshots

![App Screenshot](https://i.imgur.com/DH6wQ6j.png)


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DETA_KEY` - The Deta API key

`SECRET` - The JWT secret


## Lessons Learned

Don't use technologies or tools you have never worked with to create a complete product.
## Features

- Light/dark mode
- 800+ Exercises/Workouts
- Meditation
- BMI Calculator
- Extensive Stats
- Progress tracking/logging
- Recommendations


## FAQ

#### Where is your progress stored?

Your progress is safely stored in the cloud and only you can access it.

#### Where do the workouts and other data come from?

All of the workouts and other data come from either our own API or a 3rd party API or library.

## Feedback

If you have any feedback, please tweet to me at [@py_bash1](https://twitter.com/py_bash1) or DM me on Discord [@pybash#3122](https://dicord.com/users/626461325744275464)
## Tech Stack

**Client:** NextJS, TailwindCSS

**Server:** Python(FastAPI)

## API Reference

The API Reference can be found [here](https://befit.up.railway.app/docs).
## Contributing

Contributions are always welcome!

Clone and repo and run `npm run dev` or `yarn dev` to start the local webserver
```bash
$ git clone https://github.com/pybash1/befit.git
$ cd befit
$ yarn dev
```

Start the Python API
```bash
$ cd befit/server/api
$ pip install -r requirements.txt
$ python3 -m uvicorn api:api --reload
```
## License

[MIT](https://choosealicense.com/licenses/mit/)


## Authors

- [@pybash](https://www.github.com/pybash1)

