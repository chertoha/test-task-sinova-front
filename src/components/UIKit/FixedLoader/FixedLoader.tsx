import { FC } from "react";
import { ClipLoader } from "react-spinners";

interface IProps {
  isLoading: boolean;
  size?: number;
}

const FixedLoader: FC<IProps> = ({ isLoading, size = 70 }) => {
  return (
    isLoading && (
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <ClipLoader size={size} cssOverride={{ borderWidth: "4px" }} />
      </div>
    )
  );
};

export default FixedLoader;
