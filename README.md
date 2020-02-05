# Deno-based PaaS project

> An attempt to create a Deno-based PaaS that uses Isolates to deploy things

## Project description

The idea is to use Deno to deploy third-party code running within one Deno instance.
The aim is to rely on using V8 Isolates with bootstrapped Deno environment, rather than running via separate processes.

Current approach:
Build a basic REST API with auth and everything first, run code via processes, migrate to isolates later.

Approaches that failed:
- Dynamic import:
  - it worked
  - runs on the same (shares global scope)
  - cannot be controlled by parent
- Worker:
  - didn't work (still WIP in Deno)
  - cannot be controlled by parent
- Deno native plugin: 
  - didn't work (not enough public APIs)
  - Deno will expose Deno Worker later on natively


## Related links

- [Deno](https://deno.land/)
- [Deno native plugins PR](https://github.com/denoland/deno/pull/3372)
- [djwt](https://github.com/timonson/djwt/) - JWT lib for Deno
- [oak](https://github.com/oakserver/oak/) - Web framework for Deno
- [hmac](https://github.com/chiefbiiko/hmac/) - hashing lib for Deno

## Useful links

- [YouTube channel](https://www.youtube.com/c/TimErmilov) with videos covering code
- [Discord chat](https://discord.gg/hnKCXqQ) for questions and live discussions
- [Subreddit](https://www.reddit.com/r/BuildingWithJS/) for discussions
- [Facebook page](https://www.facebook.com/buildingproductswithjs/) with updates on progress
- [My twitter](https://twitter.com/yamalight) with updates on progress (and other stuff)

## License

[MIT](https://opensource.org/licenses/mit-license)
