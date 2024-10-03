import { Discussions, Discussion, UserFilter, Users, User } from "./types";
import { FlarumApi } from "./flarum";

export class FlarumUsers {
    /**
     * @description get all users
     * @param userNameOrUserId if authorizing with api key, pass the user ID, otherwise pass the username
     * @param passwordOrApiToken if authorizing with the api key, pass api key, otherwise pass the password.
     * @returns string for error and undefined in case of success
     */
    static getAll = async (api: FlarumApi, filter?: UserFilter): Promise<string|Users> => {
        let urlParams = `${api.endpoint}/users`;
        let q = '';
        if (filter && filter.userName) {
            q = filter.userName;
        }

        if (q.length > 0) {
            urlParams += `?filter[q]=${q}`;
        }
        const response = await api.getFetch(urlParams);

        if (typeof(response) === 'string') {
            return response;
        }

        const reply = response as Users;
        if (reply === undefined) {
            throw `Failed to get Users`;
        }

        return reply;
    }

    static getNext = async(api: FlarumApi, discussions: Discussions): Promise<string|Users> => {
        if (!discussions.links.next) {
            const empty: Users = {
                links: {
                    first: discussions.links.first,
                },
                data: [],
                included: [],
            }
            return empty;
        }
        const response = await api.getFetch(discussions.links.next);

        if (typeof(response) === 'string') {
            return response;
        }

        const reply = response as Users;
        if (reply === undefined) {
            throw `Failed to get Users`;
        }

        return reply;
    }

    static getPrev = async(api: FlarumApi, discussions: Discussions): Promise<string|Users> => {
        if (!discussions.links.prev) {
            const empty: Users = {
                links: {
                    first: discussions.links.first,
                },
                data: [],
                included: [],
            }
            return empty;
        }

        const response = await api.getFetch(discussions.links.prev);

        if (typeof(response) === 'string') {
            return response;
        }

        const reply = response as Users;
        if (reply === undefined) {
            throw `Failed to get Users`;
        }

        return reply;
    }

    /**
     * Create a new discussion
     * POST /api/discussions
     * @param api 
     * @param discussion 
     */
    static create = async(api: FlarumApi, user: User): Promise<string|User> => {
        const url = `${api.endpoint}/users`;
        user.data.attributes.isEmailConfirmed = true;
        const body = JSON.stringify(user);
        const response = await api.postFetch(url, body);

        if (typeof(response) === 'string') {
            return response;
        }

        return response as User;
    }

    /**
     * @description Get information about the forum, including groups and tags
     */
    static get = async (api: FlarumApi, id: number): Promise<string|User> => {
        let urlParams = `${api.endpoint}/users/${id}`;

        const response = await api.getFetch(urlParams);

        if (typeof(response) === 'string') {
            return response;
        }

        const reply = response as User;
        if (reply === undefined) {
            throw `Failed to get User`;
        }

        return reply;
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

    /**
     * Checks whether the given token is valid or not. In case of an error returns an error string.
     * @param api FlarumApi.
     * @param token access token
     */
    static canAccess = async (api: FlarumApi, token: string): Promise<boolean> => {
        const url = `${api.endpoint}/access-tokens`;
        var tempApi = api.cloneWithToken(token);
        const response = await tempApi.getFetch(url);

        if (typeof(response) === 'string') {
            return false;
        }
        return true;
    }
}