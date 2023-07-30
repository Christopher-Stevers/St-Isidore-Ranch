import { useRouter } from "next/router";
import ErrorPage from "next/error";
import { getPostBySlug, getAllPosts } from "../../lib/api";
import { type PostType } from "~/typedefs/Blog";
import Head from "next/head";
import { remark } from "remark";
import html from "remark-html";
import LayoutSecondary from "~/layouts/LayoutSecondary";

type Props = {
  post: PostType;
  morePosts: PostType[];
  preview?: boolean;
};
export default function Post({ post }: Props) {
  const router = useRouter();
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />;
  }
  return (
    <>
      <LayoutSecondary title={"Blog"}>
        <article className="mx-32 mb-32">
          <Head>
            <title>{post.title}</title>
          </Head>
          <h3 className="py-8 text-3xl font-semibold">
            {post.title}
          </h3>
          <div
            dangerouslySetInnerHTML={{
              __html: post.content,
            }}
          />
        </article>
      </LayoutSecondary>
    </>
  );
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    "title",
    "date",
    "slug",
    "author",
    "content",
    "ogImage",
    "coverImage",
  ]);
  const result = await remark()
    .use(html)
    .process(post.content || "");
  const content = result.toString();

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  };
}

export function getStaticPaths() {
  const posts = getAllPosts(["slug"]);
  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
