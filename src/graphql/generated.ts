import type { GraphQLResolveInfo } from 'graphql';
import type { MercuriusContext } from 'mercurius';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
export type ResolverFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) =>
    | Promise<import('mercurius-codegen').DeepPartial<TResult>>
    | import('mercurius-codegen').DeepPartial<TResult>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
    [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
    _FieldSet: any;
};

export type Post = {
    __typename?: 'Post';
    id: Scalars['ID'];
    title: Scalars['String'];
    body: Scalars['String'];
    published: Scalars['Boolean'];
    owner: User;
};

export type CreatePostInput = {
    title: Scalars['String'];
    body: Scalars['String'];
    published: Scalars['Boolean'];
    ownerId: Scalars['String'];
};

export type User = {
    __typename?: 'User';
    id: Scalars['ID'];
    username: Scalars['String'];
    firstname: Scalars['String'];
    lastname: Scalars['String'];
    posts?: Maybe<Array<Maybe<Post>>>;
};

export type CreateUserInput = {
    username: Scalars['String'];
    firstname: Scalars['String'];
    lastname: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createUser: User;
    createPost: Post;
};

export type MutationcreateUserArgs = {
    data: CreateUserInput;
};

export type MutationcreatePostArgs = {
    data: CreatePostInput;
};

export type Query = {
    __typename?: 'Query';
    user: User;
    users: Array<Maybe<User>>;
    post: Post;
    posts: Array<Maybe<Post>>;
};

export type QueryuserArgs = {
    id: Scalars['ID'];
};

export type QuerypostArgs = {
    id: Scalars['ID'];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
    | ResolverFn<TResult, TParent, TContext, TArgs>
    | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> {
    subscribe: SubscriptionSubscribeFn<
        { [key in TKey]: TResult },
        TParent,
        TContext,
        TArgs
    >;
    resolve?: SubscriptionResolveFn<
        TResult,
        { [key in TKey]: TResult },
        TContext,
        TArgs
    >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
    resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
    TResult,
    TKey extends string,
    TParent,
    TContext,
    TArgs,
> =
    | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
    | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
    TResult,
    TKey extends string,
    TParent = {},
    TContext = {},
    TArgs = {},
> =
    | ((
          ...args: any[]
      ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
    | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
    parent: TParent,
    context: TContext,
    info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
    obj: T,
    context: TContext,
    info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
    TResult = {},
    TParent = {},
    TContext = {},
    TArgs = {},
> = (
    next: NextResolverFn<TResult>,
    parent: TParent,
    args: TArgs,
    context: TContext,
    info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
    Post: ResolverTypeWrapper<Post>;
    ID: ResolverTypeWrapper<Scalars['ID']>;
    String: ResolverTypeWrapper<Scalars['String']>;
    Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
    CreatePostInput: CreatePostInput;
    User: ResolverTypeWrapper<User>;
    CreateUserInput: CreateUserInput;
    Mutation: ResolverTypeWrapper<{}>;
    Query: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
    Post: Post;
    ID: Scalars['ID'];
    String: Scalars['String'];
    Boolean: Scalars['Boolean'];
    CreatePostInput: CreatePostInput;
    User: User;
    CreateUserInput: CreateUserInput;
    Mutation: {};
    Query: {};
};

export type PostResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Post'] = ResolversParentTypes['Post'],
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    body?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    published?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
    owner?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
    id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
    username?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    firstname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    lastname?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
    posts?: Resolver<
        Maybe<Array<Maybe<ResolversTypes['Post']>>>,
        ParentType,
        ContextType
    >;
    isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
    createUser?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<MutationcreateUserArgs, 'data'>
    >;
    createPost?: Resolver<
        ResolversTypes['Post'],
        ParentType,
        ContextType,
        RequireFields<MutationcreatePostArgs, 'data'>
    >;
};

export type QueryResolvers<
    ContextType = MercuriusContext,
    ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
    user?: Resolver<
        ResolversTypes['User'],
        ParentType,
        ContextType,
        RequireFields<QueryuserArgs, 'id'>
    >;
    users?: Resolver<
        Array<Maybe<ResolversTypes['User']>>,
        ParentType,
        ContextType
    >;
    post?: Resolver<
        ResolversTypes['Post'],
        ParentType,
        ContextType,
        RequireFields<QuerypostArgs, 'id'>
    >;
    posts?: Resolver<
        Array<Maybe<ResolversTypes['Post']>>,
        ParentType,
        ContextType
    >;
};

export type Resolvers<ContextType = MercuriusContext> = {
    Post?: PostResolvers<ContextType>;
    User?: UserResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
};

export type Loader<TReturn, TObj, TParams, TContext> = (
    queries: Array<{
        obj: TObj;
        params: TParams;
    }>,
    context: TContext & {
        reply: import('fastify').FastifyReply;
    },
) => Promise<Array<import('mercurius-codegen').DeepPartial<TReturn>>>;
export type LoaderResolver<TReturn, TObj, TParams, TContext> =
    | Loader<TReturn, TObj, TParams, TContext>
    | {
          loader: Loader<TReturn, TObj, TParams, TContext>;
          opts?: {
              cache?: boolean;
          };
      };
export interface Loaders<
    TContext = import('mercurius').MercuriusContext & {
        reply: import('fastify').FastifyReply;
    },
> {
    Post?: {
        id?: LoaderResolver<Scalars['ID'], Post, {}, TContext>;
        title?: LoaderResolver<Scalars['String'], Post, {}, TContext>;
        body?: LoaderResolver<Scalars['String'], Post, {}, TContext>;
        published?: LoaderResolver<Scalars['Boolean'], Post, {}, TContext>;
        owner?: LoaderResolver<User, Post, {}, TContext>;
    };

    User?: {
        id?: LoaderResolver<Scalars['ID'], User, {}, TContext>;
        username?: LoaderResolver<Scalars['String'], User, {}, TContext>;
        firstname?: LoaderResolver<Scalars['String'], User, {}, TContext>;
        lastname?: LoaderResolver<Scalars['String'], User, {}, TContext>;
        posts?: LoaderResolver<Maybe<Array<Maybe<Post>>>, User, {}, TContext>;
    };
}
declare module 'mercurius' {
    interface IResolvers
        extends Resolvers<import('mercurius').MercuriusContext> {}
    interface MercuriusLoaders extends Loaders {}
}
