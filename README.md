# wherever

Tiny NodeJS Static Web Server.

Simple use simple play. Start a server for you right away.

```
npm isntall wherever -g
```

## Use it

```
wherever    # Make the current folder the root of the static resource server
```

### Params

```
wherever -p 9000        # Set the port number to 9000

wherever -n localhost   # Set host to localhost

wherever -d /usr        # Set the root directory to /usr

wherever -o             # Open the website

wherever -s             # Static server mode, ignore the parameters of the get request

wherever -d             # File download mode, it will download the file locally for the file path

wherever -i             # Image base64 mode, convert the image to base64 and present it as text.

wherever -u             # File upload mode, upload files to the specified folder on the web page.
```

## If~

If you like it. Please give me a little encouragement. Star it >> [ [github project](https://github.com/Coyeah/wherever) ]

If something doesn’t work, please [file an issue](https://github.com/Coyeah/wherever/issues).
