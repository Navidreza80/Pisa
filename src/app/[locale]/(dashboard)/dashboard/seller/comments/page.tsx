import HeaderDashboard from "@/components/common/dashboard/HeaderDashboard";
import SellerDashboardComments from "@/components/pages/sd-comments/container";
import { getSellerComments } from "@/utils/service/comments/get";

const Page = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page: string;
    search: string;
    rating: string;
    sort: string;
    order: string;
  }>;
}) => {
  const { page, sort, order, rating } = await searchParams;
  const comments = await getSellerComments({
    page,
    house_id: "8",
    limit: "5",
    rating,
    sort,
    order,
  });

  console.log(comments);

  return (
    <>
      <HeaderDashboard title={"مدیریت نظرات"} />
      <SellerDashboardComments
        comments={comments.data}
        totalCount={comments.totalCount}
      />
    </>
  );
};
export default Page;
