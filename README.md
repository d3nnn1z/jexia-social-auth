# jexia-social-auth
A simple prototype demonstrating how to use [Jexia](https://www.jexia.com) to provide custom and social authentication for end users. This project is using the official [jexia-sdk-js](https://github.com/jexia-inc/jexia-sdk-js).

>In order to run this application you need a valid **Jexia** account.

## Features
* Custom Login / Register (encrypted)
* Login through Facebook, Twitter, Github
* Session handling
* Usage of [jexia-sdk-js](https://github.com/jexia-inc/jexia-sdk-js)

## Installation
1. git clone https://github.com/d3nnn1z/jexia-social-auth

2. ```npm install```

3. ```node app.js```

4. Open your browser at http://localhost:3000

5. Don't forget to [configure](https://github.com/d3nnn1z/jexia-social-auth#Configuration) your app details under config/ folder.
>You can register as a new user or use the links to login through a social provider.
>Keep in mind that for twitter we call the login as http://127.0.0.1:3000/login/twitter
due to twitter restrictions for localhost.

## Configuration
1. Login to [Jexia](https://app.jexia.com/login.html) and create a new data app **SocialAuth**.
Update config/jexia.js configuration with your Jexia app details.
2. Create a data set **accounts** with the following fields:
```js
username: string
password: string
email: string
firstName: string
lastName: string
facebook: json
twitter: json
github: json
```
> If you don't want a specific provider authentication you can ignore it.

3. Go to https://developers.facebook.com/ and create a new facebook application.
Update the config/fb.js with your facebook app details.

4. Go to https://apps.twitter.com/ and create a new twitter application.
Update the config/twitter.js with your twitter app details.

5. Go to https://github.com/settings/applications/new and create a new github application.
Update the config/github.js with your github app details.

> For twitter you must load the application through http://127.0.0.0:3000/.
This is only for your local development because twitter doesn't accept localhost as a valid domain.

## Screenshots

### Login
![Login](http://i.imgur.com/mXsctJI.png)

### Register
![Register](http://i.imgur.com/PZ4KaU3.png)

## License

The MIT License (MIT)

Copyright (c) 2016 Dionysis Pantazopoulos <d3nnn1z@gmail.com>

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
