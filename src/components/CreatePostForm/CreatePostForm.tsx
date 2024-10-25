import { imageAllowedMIMETypes } from "@/config/images";
import { IoAddOutline } from "react-icons/io5";

const CreatePostForm = () => {
  return (
    <>
      <button
        type="button"
        aria-label="Add post"
        className="border rounded-md text-white bg-green-600 hover:bg-green-500 transition-colors duration-300 ease-in-out"
      >
        <IoAddOutline size={40} />
      </button>

      <form>
        <input type="text" placeholder="Title" name="title" className="block" />
        <input
          type="text"
          placeholder="Short description"
          name="shortDescription"
          className="block"
        />

        <label className="h-[200px] w-[200px] border border-black flex items-center justify-center rounded-2xl cursor-pointer hover:border-green-600 hover:text-green-600 transition-colors duration-300 ease-in-out">
          <IoAddOutline size={60} />
          <input type="file" hidden accept={imageAllowedMIMETypes.join(",")} />
        </label>

        <textarea name="content" placeholder="Content" className="block"></textarea>
      </form>
    </>
  );
};

export default CreatePostForm;
