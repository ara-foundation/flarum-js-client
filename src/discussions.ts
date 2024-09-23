import { Discussions, DiscussionFilter, Discussion } from "./types";
import { FlarumApi } from "./flarum";

export class FlarumDiscussions {
    /**
     * @description get all discussions (sort is -time by default)
     * @param userNameOrUserId if authorizing with api key, pass the user ID, otherwise pass the username
     * @param passwordOrApiToken if authorizing with the api key, pass api key, otherwise pass the password.
     * @returns string for error and undefined in case of success
     */
    static getAll = async (api: FlarumApi, discussionsFilter?: DiscussionFilter): Promise<string|Discussions> => {
        let q = '';
        if (discussionsFilter && discussionsFilter.userName) {
            q = discussionsFilter.userName;
        }

        let url = `${api.endpoint}/discussions`;
        if (q.length > 0) {
            url += `?q=${q}`;
        }

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
            const reply = json as Discussions;
            if (reply === undefined) {
                throw `Failed to get Discussion`;
            }

            return reply;
        } catch (e) {
            return JSON.stringify(e);
        }
    }

    static getNext = async(api: FlarumApi, discussions: Discussions): Promise<string|Discussions> => {
        if (!discussions.links.next) {
            const empty: Discussions = {
                links: {
                    first: discussions.links.first,
                },
                data: [],
                included: [],
            }
            return empty;
        }
        const response = await fetch(discussions.links.next, {
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
            const reply = json as Discussions;
            if (reply === undefined) {
                throw `Failed to get Discussion`;
            }

            return reply;
        } catch (e) {
            return JSON.stringify(e);
        }
    }

    static getPrev = async(api: FlarumApi, discussions: Discussions): Promise<string|Discussions> => {
        if (!discussions.links.prev) {
            const empty: Discussions = {
                links: {
                    first: discussions.links.first,
                },
                data: [],
                included: [],
            }
            return empty;
        }
        const response = await fetch(discussions.links.prev, {
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
            const reply = json as Discussions;
            if (reply === undefined) {
                throw `Failed to get Discussion`;
            }

            return reply;
        } catch (e) {
            return JSON.stringify(e);
        }
    }

    /**
     * Create a new discussion
     * POST /api/discussions
     * @param api 
     * @param discussion 
     */
    static create = async(api: FlarumApi, discussion: Discussion): Promise<void> => {
        throw `not implemented yet`;
    }

    /**
     * @description Get information about the forum, including groups and tags
     */
    static get = async (api: FlarumApi, id: number): Promise<string|Discussion> => {
        let url = `${api.endpoint}/discussions/${id}`;

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
            const reply = json as Discussion;
            if (reply === undefined) {
                throw `Failed to get Discussion`;
            }

            return reply;
        } catch (e) {
            return JSON.stringify(e);
        }
    }

    /**
     * PATCH /api/discussions/:id - update the discussion 
     * @param api 
     * @param id 
     * @returns 
     */
    static update = async (api: FlarumApi, id: number, data: Discussion): Promise<string|undefined> => {
        throw `not implemented yet`;
    }

    /**
     * @description Update forum config
     */
    static delete = async (api: FlarumApi, id: number): Promise<undefined|string> => {
        // https://github.com/flarum/flarum.github.io/blob/20322c0e6011e4f304ae7e95f41594a0b086bc27/_docs/api.md
        throw `TODO: implement`;
    }
}