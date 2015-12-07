# Refig
Refig is a flexible configuration reading, writing, and caching library that works through `Promise` objects, traditional callbacks, and synchronously.  It parses information from local configurations, global configurations, and `package.json` (if available).  It defaults to `JSON` parsing and serializing, but you can set your own, as long as they follow the `JSON` interface (like `CSON`).

---

### The Problem
Configurations in modern applications can become wide-spread through a system, they use multiple locations to tell the application what to do depending on the scenario.  You can have global configs, local configs, and even `package.json` configs.  With a widespread system like this, it can be difficult to manage all the different locations a entry could be listed.

### The Solution
Refig provides a simple interface to source configurations files from multiple locations, parse all of them, and concatenate them into one object.  This makes it more flexible for the user and easier for you to develop...  Plus the caching and async interface makes for a fast library
