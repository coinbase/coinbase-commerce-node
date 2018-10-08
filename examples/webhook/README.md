Run in current folder

``` sh
npm install
node webhook.js
```

Make your server externally accessible.
For testing purpose, you can install  [ngrok](https://ngrok.com/) and run:

``` sh
ngrok http 3000
```
The output should be something similar to:

Session Status                online
Session Expires               7 hours, 59 minutes
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://cbfcdae9.ngrok.io -> localhost:3000
Forwarding                    https://cbfcdae9.ngrok.io -> localhost:3000

Copy the "https" link (in this case https://cbfcdae9.ngrok.io) to your clipboard and then paste it into the Settings\Webhook section of Coinbase Commerce's admin page.
Send test request.
