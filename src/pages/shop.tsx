import { appRouter } from "~/server/api/root";
import { createServerSideHelpers } from "@trpc/react-query/server";
import superjson from "superjson";
import { prisma } from "~/server/db";
import { BoxGroups } from "~/utils/boxManagement";

import Shop from "../components/Shop";

export default function Page() {
  return <Shop />;
}

export async function getServerSideProps() {
  const helpers = createServerSideHelpers({
    router: appRouter,
    ctx: {
      session: null,
      prisma,
    },
    transformer: superjson,
  });
  /*
   * Prefetching the `post.byId` query.
   * `prefetch` does not return the result and never throws - if you need that behavior, use `fetch` instead.
   */

  for (const boxGroup of BoxGroups.slice(0, 3)) {
    const firstBoxSlug = boxGroup.Boxes[0].slug;
    await helpers.product.getInStock.fetch(firstBoxSlug);
  }
  // Make sure to return { props: { trpcState: helpers.dehydrate() } }
  return {
    props: {
      trpcState: helpers.dehydrate(),
    },
  };
}
