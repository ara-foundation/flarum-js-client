import 'dotenv/config';
import { FlarumApi } from "../src/index";

let flarumApi = new FlarumApi(process.env.FORUM_API_ENDPOINT!, true);

// Status is OK if token is generated, otherwise an error message
async function main() {
    // uncomment to authorize with the api key.
    // api key is generated using npx tsx ./test/start.ts
    // const status = await flarumApi.authorize(process.env.FLARUM_ADMIN_ID!, process.env.FORUM_API_KEY!);

    const status = await flarumApi.authorize(process.env.FORUM_ADMIN_USER!, process.env.FORUM_ADMIN_PASSWORD!);
    if (status) {
        console.log(status);
    }
}

main();
// // Return all apis
// await FlarumDiscussions.getAll(flarumApi, filter?);
// await FlarumDiscussions.create(flarumApi);
// await FlarumDiscussions.get(flarumApi, id);
// await FlarumDiscussions.patch(flarumApi, id, discussion);
// await FlarumDiscussions.delete();