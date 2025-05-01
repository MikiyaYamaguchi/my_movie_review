import { EosIconsLoading } from "@/app/components/icons";
import loading from "@/app/styles/loading.module.scss";

const Loading = () => {
  return (
    <div className={loading.loadingOverlay}>
      <div className={loading.loader}>
        <EosIconsLoading />
        <span>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
