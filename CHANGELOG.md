4.0.0
* BREAKING CHANGE: moved from `tempicolabs.com/api` to `api.itsecurity.ee`
* UMD & ES bundle sizes decrease
* Updated all dependencies to the latest versions
* Fixing for node v4 support
* Fixing for using with webpack
* Docs, README & LICENCE updates

3.3.0
* Bundle size decrease using [size-limit](https://www.npmjs.com/package/size-limit)
* `HashCommand` updates. Removed method `HashCommand.getStringHash`, added new `HashCommand.getInputHash`
* Updated all dependencies to the latest versions
* Test updates
* Better coverage
* Docs updated
* Other fixes

3.2.1
* Updated API version to `v3`
* Added new option for FetchCommand `formatting` (enabled by default). This option add header `X-Requested-With: XMLHttpRequest` which is useful for performance increase.
* Fixed tests in accordance with the version

3.2.0
* New endpoint added `account/status`
* Tests updates
* `Account` class added
* Docs updated

3.1.0
* Fixing fetch function in main package
* Some static methods added
* RunKit support added
* Updated Examples & Docs
* Added event constants module

3.0.0
* UMD Module fix
* Hashing string, streams, files
* Added batch commands for TmLabs class
* Examples updates
* Documentation (Thanks to JSDoc)

2.0.0
* Added bower support
* TmLabs class init options added limit. Queue concurrency option value
* New endpoint added `email/leaks`
* Queue added to TmLabs class.

1.0.0
* Initial release
