export type Status = undefined | string;
export type Response = {
    data: Forum
}

export type HexColor = `#{string}`;
export type RelationshipElement = {
    type: "groups" | "tags" | "ranks" | "posts" | "users",
    id: number
}

export type ContentType = "comment" | string;

export type IncludedGroup = RelationshipElement & {
    attributes: {
        nameSingular: string,
        namePlural: string;
        color: HexColor,
        icon?: string,
        isHidden: number, 
    }
}

export type IncludedTag = RelationshipElement & {
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

export type IncludedUser = RelationshipElement & {
    attributes: {
      username: string,
      displayName: string,
      avatarUrl: string,
      slug: string
    }
}

export type IncludedPost = RelationshipElement & {
    attributes: {
      number: number,
      createdAt: string,
      contentType: ContentType,
      contentHtml: string,
      renderFailed: boolean,
      mentionedByCount: number
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
            data: RelationshipElement[]
        },
        tags: {
            data: RelationshipElement[]
        },
        ranks: {
            data: RelationshipElement[]
        }
    }
}

export type Forum = {
    data: ForumData,
    included: Array<IncludedGroup|IncludedTag>
}

export type Links = {
    first: string,
    prev?: string,
    next?: string,
}

export type DiscussionData = {
    type: "discussions",
    id: number,
    attributes: {
      title: string,
      slug: string,
      commentCount: number,
      participantCount: number,
      createdAt: string,
      lastPostedAt: string,
      lastPostNumber: number,
      canReply: boolean,
      canRename: boolean,
      canDelete: boolean,
      canHide: boolean,
      seeVotes: boolean,
      canVote: boolean,
      canTag: boolean,
      hasPoll: boolean,
      canStartPoll: boolean,
      isSticky: boolean,
      canSticky: boolean,
      isLocked: boolean,
      canLock: boolean
    },
    relationships: {
        user: {
            data: RelationshipElement
        },
        lastPostedUser: {
            data: RelationshipElement
        },
        tags: {
            data: RelationshipElement[]
        },
        firstPost: {
            data: RelationshipElement
        }
    }
}

export type Discussions = {
    links: Links,
    data: DiscussionData[],
    included: Array<IncludedUser|IncludedTag|IncludedPost|IncludedGroup>;
}

export type Discussion = {
    data: DiscussionData,
    included: Array<IncludedUser|IncludedTag|IncludedPost|IncludedGroup>;
}

export type DiscussionFilter = {
    userName?: string,
}