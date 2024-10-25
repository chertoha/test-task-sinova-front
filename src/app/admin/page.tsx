import AdminPostList from "@/components/AdminPostList";
import Container from "@/components/Container";
import CreatePostForm from "@/components/CreatePostForm";
import { basicFetch } from "@/helpers/basicFetch";
import { PostType } from "@/types/entities";
import { Pageable } from "@/types/responses";

const AdminPage = async () => {
  const response = await basicFetch<Pageable<PostType>>("/posts", {
    params: { page: 1, limit: 100 },
  });

  return (
    <>
      <Container>
        <CreatePostForm />

        <div className="mt-10">
          <button
            type="button"
            className="border rounded-md border-red-600 py-2 px-3 text-red-600 hover:bg-red-600 hover:text-white transition-colors duration-300 ease-in-out"
          >
            Multiple delete
          </button>
        </div>

        <div className="mt-10">{response?.data && <AdminPostList list={response.data} />}</div>
      </Container>
    </>
  );
};

export default AdminPage;
