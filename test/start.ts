import 'dotenv/config';
import { generateApiToken } from "../src/index";

// Status is OK if token is generated, otherwise an error message
async function main() {
    generateApiToken(process.env.FLARUM_ADMIN_ID!);
}

main();