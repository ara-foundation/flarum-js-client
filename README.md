# Flarum Javascript Client
[Flarum](https://flarum.org/) is a popular PHP Forum Framework. Flarum has public a public API Endpoint. This Javascript/Typescript Client allows to interact with the forum from Reactjs/Nodejs applications

Through this api, you can create users, moderate forum discussions.

This project is made in Ara Platform. Which means, you can participate, request features, or support maintainers.

Main Maintainer: [Medet Ahmetson](https://forum.ara.foundation/u/ahmetson).
For any questions, sign up on [Ara Forum](https://forum.ara.foundation) for free. Create a post with the "Sangha" tag. And in the title of the forum, write the "Flarum Javascript Client" prefix.

To speed up the reply, tag Medet Ahmetson in your post.

## Requirements
Requires Nodejs 18 or above.

## Instructions

First, you need to create API key in the Forum for the admin user.
To see how it's done, run `npx tsx ./test/start.ts`

Or issue a 1 hour session token. Print the access token, if you enabled the verbose flag in FlarumApi.
Add the session token to the .env.
The command to issue a token:


# Maintainers

1. Simply upgrade the version in package.json.
Then call to make it available in the NPMJS.

2. Add the tag on git.

3. Compile the Javascript:

```
tsc
```

4. Then publish:
```
npm publish --access public
```

# References for contributors

* https://docs.flarum.org/rest-api/#access-tokens
* https://github.com/flarum/flarum.github.io/blob/20322c0e6011e4f304ae7e95f41594a0b086bc27/_docs/api.md