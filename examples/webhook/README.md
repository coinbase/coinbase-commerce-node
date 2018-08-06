Run in current folder

``` sh
npm install
node webhook.js
```

Make your server externally accessible.
For test purpose you can install  [ngrock](https://ngrok.com/)  and run

``` sh
ngrok http 3000
```
The output will be similar

Session Status                online
Session Expires               7 hours, 59 minutes
Version                       2.2.8
Region                        United States (us)
Web Interface                 http://127.0.0.1:4040
Forwarding                    http://cbfcdae9.ngrok.io -> localhost:3000
Forwarding                    https://cbfcdae9.ngrok.io -> localhost:3000

Copy https link (in this case https://cbfcdae9.ngrok.io) go to Coinbase Commerse admin panel, past link in Settings/Webhook section.
Send test request.
