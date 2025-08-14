import loading from "@/app/styles/loading.module.scss";

export default function Loading() {
  return (
    <div className={loading.loadingOverlay}>
      <div className={loading.loader}>
        <span className={loading.loaderTxt}>Loading...</span>
      </div>
    </div>
  );
}
