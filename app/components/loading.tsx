import loading from "@/app/styles/loading.module.scss";

const Loading = () => {
  return (
    <div className={loading.loadingOverlay}>
      <div className={loading.loader}>
        <span className={loading.loaderTxt}>Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
