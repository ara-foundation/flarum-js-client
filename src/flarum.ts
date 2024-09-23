import { Forum, Status } from "./types";
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
    public readonly verbose: boolean = false;
    
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

    /**
     * @description Authorize the Client to access the Flarum Endpoint.
     * Without authorization, Most of the POST/PUT/DELETE operations are not available.
     * 
     * Flarum supports two way of authentication, either through API Keys.
     * Or through the Access Tokens.
     * @param userNameOrUserId if authorizing with api key, pass the user ID, otherwise pass the username
     * @param passwordOrApiToken if authorizing with the api key, pass api key, otherwise pass the password.
     * @returns string for error and undefined in case of success
     */
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

    /**
     * @description Get information about the forum, including groups and tags
     */
    public get = async (): Promise<string|Forum> => {
        const url = `${this.endpoint}`;

        const response = await fetch(url, {
            headers: {
                'Content-Type': `application/json`
            },
            method: "GET",
        })

        if (!response.ok) {
            return `Response Status ${response.status}: ${response.statusText}`;
        }

        try {
            const json = await response.json();
            const reply = json as Forum;
            if (reply === undefined) {
                throw `Failed to get Forum`;
            }
            return reply
        } catch (e) {
            return JSON.stringify(e);
        }
    }

    /**
     * @description Update forum config
     */
    public update = async (): Promise<undefined> => {
        // https://github.com/flarum/flarum.github.io/blob/20322c0e6011e4f304ae7e95f41594a0b086bc27/_docs/api.md
        throw `TODO: implement`;
    }
}