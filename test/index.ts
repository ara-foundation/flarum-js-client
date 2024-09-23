import 'dotenv/config';
import { FlarumApi, FlarumDiscussions } from "../src/index";

let flarumApi = new FlarumApi(process.env.FORUM_API_ENDPOINT!, true);

// Status is OK if token is generated, otherwise an error message
async function main() {
    // uncomment to authorize with the api key.
    // api key is generated using npx tsx ./test/start.ts
    // const status = await flarumApi.authorize(process.env.FLARUM_ADMIN_ID!, process.env.FORUM_API_KEY!);

    // uncomment to authorize with the access key.
    // const status = await flarumApi.authorize(process.env.FORUM_ADMIN_USER!, process.env.FORUM_ADMIN_PASSWORD!);
    // if (status) {
        // console.log(status);
    // }

    // get general forum information including groups, and tags
    // const forum = await flarumApi.get();
    // console.log(forum);

    const discussions = await FlarumDiscussions.getAll(flarumApi);
    if (typeof(discussions) === 'string') {
        console.error(discussions);
        return;
    } else {
        // console.log(discussions.data);
    }

    const discussion = await FlarumDiscussions.get(flarumApi, discussions.data[0].id)
    if (typeof(discussion) === 'string') {
        console.error(discussion);
        return;
    } else {
        console.log(discussion);
    }
}

main();