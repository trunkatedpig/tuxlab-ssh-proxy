# Alpine Node.js

This fork contains the dockerfile for a docker alpine image with nodejs and redbird installed.

## Notes

`node` is in `/usr/bin`

`npm` is in `/usr/bin`

global npm modules are also installed to `/usr/bin`

`/usr/lib/node_modules` holds the globally installed modules

# Usage
To build this image, pull this repo and cd into the directory containing Dockerfile. Then, run

```
docker build -t IMAGENAME .
```

To create a container, then run

```
docker run -it -P --name CONTAINERNAME IMAGENAME /usr/bin/node /root/proxies.js
```
