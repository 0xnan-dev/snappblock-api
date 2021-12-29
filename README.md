# Snappblock API

API to communicates with ISCN and IPFS

## Development

### Generate JWT for testing

run the test `auth.service.spec.ts` to get the signature and use it for authentication, please change the message to match with auth configuration.

### SSH Tunnel to IPFS node

Since IPFS node 5001 port should not expose to public, you can whitelist your ssh key and create a SSH tunnel to your local dev environment:

```shell



```