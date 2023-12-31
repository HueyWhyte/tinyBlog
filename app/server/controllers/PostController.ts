import { redirect } from "@remix-run/node";
import Post from "../models/Post";
import { GraphQLClient, gql } from "graphql-request";

export default class PostController {
  private request: Request;
  private hygraph: any;

  constructor(request: Request) {
    this.request = request;
    this.hygraph = new GraphQLClient(`${process.env.HYGRAPH_ENDPOINT}`, {
      headers: {
        Authorization: `Bearer ${process.env.HYGRAPH_TOKEN}`,
      },
    });
  }

  public getPosts = async () => {
    const { posts } = await this.hygraph.request(
      gql`
        query {
          posts(last: 8) {
            title
            slug
            createdAt
            description
            featured
            coverImage {
              id
              url
            }
            createdBy {
              id
              name
            }
          }
        }
      `,
      {
        featured: true,
      }
    );

    return posts;

    // try {
    //   const posts = await Post.find();
    //   return posts;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  public getPostBySlug = async (slug: string) => {
    const { post } = await this.hygraph.request(
      gql`
        query ($slug: String!) {
          post(where: { slug: $slug }) {
            title
            description
            slug
            content {
              raw
            }
            coverImage {
              id
              url
            }
          }
        }
      `,
      {
        slug,
      }
    );

    return post;
  };

  public getPostById = async (id: string) => {
    const { post } = await this.hygraph.request(
      gql`
        query getPost($id: ID!) {
          post(where: { id: $id }) {
            title
            createdAt
            description
            featured
            id
            content {
              raw
            }
          }
        }
      `,
      {
        id,
      }
    );

    return post;
  };

  public createPost = async (data: {
    title: string;
    slug: string;
    description: string;
    content: any;
  }) => {
    const { createPost } = await this.hygraph.request(
      gql`
        mutation newPost(
          $title: String!
          $slug: String!
          $description: String!
          $content: RichTextAST!
          $featured: Boolean!
        ) {
          createPost(
            data: {
              title: $title
              slug: $slug
              description: $description
              content: $content
              featured: $featured
            }
          ) {
            id
            title
            content {
              raw
            }
          }
        }
      `,
      {
        title: data.title,
        slug: data.slug,
        description: data.description,
        content: data.content,
        featured: true,
      }
    );
    console.log(createPost);

    // coverImage: {
    //   create: {
    //     handle: "v30Okuf2S2ftz3knUu4g"
    //     fileName: "somes.png"
    //   }
    // }
    return redirect(`/console/blogs/${createPost.id}`);
  };

  public publishPost = async (slug: string) => {
    const { publishPost } = await this.hygraph.request(
      gql`
        mutation publishPost($slug: String!) {
          publishPost(where: { slug: $slug }, to: PUBLISHED) {
            id
            title
            content {
              raw
            }
          }
        }
      `,
      {
        slug,
      }
    );

    return publishPost;
  };

  public unpublishPost = async (slug: string) => {
    const { unpublishPost } = await this.hygraph.request(
      gql`
        mutation unpublishPost($slug: String!) {
          unpublishPost(where: { slug: $slug }, from: PUBLISHED) {
            id
            title
            content {
              raw
            }
          }
        }
      `,
      {
        slug,
      }
    );

    return unpublishPost;
  };

  public deletePost = async (slug: string) => {
    const { deletePost } = await this.hygraph.request(
      gql`
        mutation deletePost($slug: String!) {
          deletePost(where: { slug: $slug }) {
            id
            title
            content {
              raw
            }
          }
        }
      `,
      {
        slug,
      }
    );

    return deletePost;
  };

  public updatePost = async (_id: string, body: any) => {
    try {
      await Post.findByIdAndUpdate(_id, body);
    } catch (error) {
      console.log(error);
    }
  };

  public getFeaturedPosts = async () => {
    const { posts } = await this.hygraph.request(
      gql`
        query ($featured: Boolean!) {
          posts(where: { featured: $featured }, last: 10) {
            title
            slug
            createdAt
            description
            featured
            coverImage {
              id
              url
            }
            createdBy {
              id
              name
            }
          }
        }
      `,
      {
        featured: true,
      }
    );

    return posts;

    // try {
    //   const posts = await Post.find({ featured: true })
    //     .select("-content")
    //     .limit(6);
    //   return posts;
    // } catch (error) {
    //   console.log(error);
    // }
  };

  public getLatestPosts = async () => {
    const { posts } = await this.hygraph.request(
      gql`
        query {
          posts(orderBy: updatedAt_DESC) {
            title
            slug
            createdAt
            description
            featured
            coverImage {
              id
              url
            }
            createdBy {
              id
              name
            }
          }
        }
      `,
      {
        featured: true,
      }
    );

    return posts;

    // try {
    //   const posts = await Post.find({ featured: true })
    //     .select("-content")
    //     .limit(6);
    //   return posts;
    // } catch (error) {
    //   console.log(error);
    // }
  };
}
