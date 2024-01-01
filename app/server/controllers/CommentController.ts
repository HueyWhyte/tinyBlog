import { redirect } from "@remix-run/node";
import { GraphQLClient, gql } from "graphql-request";

export default class CommentController {
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

  public getCommentsByPost = async (postId: string) => {
    const { comments } = await this.hygraph.request(
      gql`
        query getComments($postId: ID!) {
          comments(where: { post: { id: $postId } }, orderBy: createdAt_DESC) {
            id
            name
            email
            comment
          }
        }
      `,
      {
        postId,
      }
    );

    return comments;
  };

  public createComment = async (data: {
    postId: string;
    name: string;
    email: string;
    comment: string;
    slug: string;
  }) => {
    const { createComment } = await this.hygraph.request(
      gql`
        mutation newComment(
          $name: String!
          $email: String!
          $comment: String!
          $postId: ID!
        ) {
          createComment(
            data: {
              name: $name
              email: $email
              comment: $comment
              post: { connect: { id: $postId } }
            }
          ) {
            id
            name
            email
            comment
          }
        }
      `,
      {
        postId: data.postId,
        name: data.name,
        email: data.email,
        comment: data.comment,
      }
    );

    return redirect(`/blogs/${data.slug}`);
  };

  public publishComment = async (id: string) => {
    const { publishComment } = await this.hygraph.request(
      gql`
        mutation publishComment($id: String!) {
          publishComment(where: { id: $id }, to: PUBLISHED) {
            id
            title
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

    return publishComment;
  };

  public unpublishComment = async (slug: string) => {
    const { unpublishComment } = await this.hygraph.request(
      gql`
        mutation unpublishComment($slug: String!) {
          unpublishComment(where: { slug: $slug }, from: PUBLISHED) {
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

    return unpublishComment;
  };

  public deleteComment = async (slug: string) => {
    const { deleteComment } = await this.hygraph.request(
      gql`
        mutation deleteComment($slug: String!) {
          deleteComment(where: { slug: $slug }) {
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

    return deleteComment;
  };

  public updateComment = async (_id: string, body: any) => {
    try {
      await Comment.findByIdAndUpdate(_id, body);
    } catch (error) {
      console.log(error);
    }
  };
}
