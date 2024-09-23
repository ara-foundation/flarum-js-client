import { Status } from "./types";
import * as crypto from "node:crypto";

export type AuthorizeRequest = {
    identification: string;
    password: string;
}

export type AuthorizeReply = {
    token: string;
    userId: string;
}

export const generateApiToken = (userId: string) => {
    const id = crypto.randomBytes(20).toString('hex');
    const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');
    console.log(`Open the Forum's database. Then execute the following database query: \n\n\tINSERT INTO ${process.env.FLARUM_DB_PREFIX!}api_keys (\`key\`, \`user_id\`, \`created_at\`) VALUES ('${id}', '${userId}', '${createdAt}');\n\n`);
    console.log(`Then, save it in the .env and use it with the client`);
}

export class FlarumApi {
    public readonly endpoint: string = "";
    private token: string = "";
    private userId: number = 0;
    private verbose: boolean = false;
    
    /**
     * 
     * @param endpoint Your forum's API endpoint. It ends with 'api'
     * @param token Your API Key. Use generateApiToken function.
     * @param verbose Optionally, if set, it will print the progress. For debug only
     */
    constructor(endpoint: string, verbose?: boolean) {
        this.endpoint = endpoint;
        if (verbose) {
            this.verbose = verbose;
        } else {
            this.verbose = false;
        }
    }

    public authorize = async (userNameOrUserId: string | number, passwordOrApiToken: string): Promise<Status> => {
        if (typeof(userNameOrUserId) == 'number') {
            this.token = passwordOrApiToken;
            this.userId = userNameOrUserId;
            return;
        }
        const body: AuthorizeRequest = {
            identification: userNameOrUserId,
            password: passwordOrApiToken,
        }

        const url = `${this.endpoint}/token`;
        if (this.verbose) {
            console.log(`Authorize in: ${url} username: ${userNameOrUserId} password: ${passwordOrApiToken}`);
        }

        const response = await fetch(url, {
            headers: {
                'Content-Type': `application/json`
            },
            method: "POST",
            body: JSON.stringify(body),
        })

        if (!response.ok) {
            return `Response Status ${response.status}: ${response.statusText}`;
        }

        try {
            const json = await response.json();
            const authorizeReply = json as AuthorizeReply;
            if (authorizeReply === undefined) {
                throw `Failed to get AuthorizeReply`;
            }

            this.token = authorizeReply.token;
            this.userId = parseInt(authorizeReply.userId);

            if (this.verbose) {
                console.log(`Access Token (${this.token}) was returned for user ${this.userId}`);
            }
        } catch (e) {
            return JSON.stringify(e);
        }

        return undefined;
    }
}