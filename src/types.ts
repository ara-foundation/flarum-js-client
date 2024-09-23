export type Status = undefined | string;
export type Response = {
    data: Forum
}

export type HexColor = `#{string}`;
export type ForumRelElement = {
    type: "groups" | "tags" | "ranks",
    id: number
}

export type ForumIncludedGroup = ForumRelElement & {
    attributes: {
        nameSingular: string,
        namePlural: string;
        color: HexColor,
        icon?: string,
        isHidden: number, 
    }
}

export type ForumIncludedTag = ForumRelElement & {
    attributes: {
        name: string,
        description: string,
        slug: string,
        color: HexColor,
        backgroundUrl?: string,
        backgroundMode?: string,
        icon?: string,
        discussionCount: number,
        position: 4,
        defaultSort?: string,
        isChild: boolean,
        isHidden: boolean,
        lastPostedAt: string,
        canStartDiscussion: boolean,
        canAddToDiscussion: boolean,
        subscription?: string
    }
}

export type ForumData = {
    type: "forums";
    id: number;
    attributes: {
        title: string;
        description: string;
        showLanguageSelector: boolean,
        baseUrl: string,
        basePath: string;
        baseOrigin: string,
        debug: boolean,
        apiUrl: string,
        welcomeTitle: string;
        welcomeMessage: string;
        themePrimaryColor: HexColor,
        themeSecondaryColor: HexColor,
        logoUrl?: string,
        faviconUrl?: string,
        headerHtml?: string,
        footerHtml?: string,
        allowSignUp: boolean,
        defaultRoute: string,
        canViewForum: boolean,
        canStartDiscussion: boolean,
        canSearchUsers: boolean,
        canCreateAccessToken: boolean,
        canModerateAccessTokens: boolean,
        assetsBaseUrl: string,
        canBypassTagCounts: boolean,
        minPrimaryTags: number,
        maxPrimaryTags: number,
        minSecondaryTags: number,
        maxSecondaryTags: number,
        allowUsernameMentionFormat: boolean,
        canMessage: boolean,
        imgUrl?: string,
        HideGuestBox: boolean,
        [key: string]: any,
    },
    relationships: {
        groups: {
            data: ForumRelElement[]
        },
        tags: {
            data: ForumRelElement[]
        },
        ranks: {
            data: ForumRelElement[]
        }
    }
}

export type Forum = {
    data: ForumData,
    included: Array<ForumIncludedGroup|ForumIncludedTag>
}
