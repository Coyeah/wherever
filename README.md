# wherever

Tiny NodeJS Static Web Server.

# Install

```
npm i -g wherever
```

# How to use

```
wherever # Make the current folder the root of the static resource server

wherever -p 9000 # Set the port number to 9000

wherever -h localhost # Set host to localhost

wherever -d /usr # Set the root directory to /usr

wherever -0 # Open the website

wherever -s # Static server mode, ignore the parameters of the get request

wherever -d # File download mode, it will download the file locally for the file path

wherever -i # Image base64 mode, convert the image to base64 and present it as text.
```

# Bug ?

If something doesn’t work, please [file an issue](https://github.com/Coyeah/wherever/issues).
