import ClientMetadata from "@/app/components/clientMetadata";
import { getSingleReview } from "@/app/lib/review";
import single from "@/app/styles/single.module.scss";
import { format } from "date-fns";
import Image from "next/image";

const Review = async (context: { params: Promise<{ id: string }> }) => {
  const { id } = await context.params;
  const singleReview = await getSingleReview(id);

  let starReview = "";
  for (let i = 0; i < Number(singleReview.star); i++) {
    starReview += "★";
  }
  const date = format(new Date(singleReview.release_date), "yyyy.M.d");
  const genreArray = singleReview.genre.split(",");
  return (
    <>
      <ClientMetadata
        title={`${singleReview.title}のレビュー詳細ページ | My Movie Review`}
        description={`${singleReview.title}のレビュー詳細ページです。`}
      />
      <div>
        <div className={single.movieInfo}>
          <div className={single.img}>
            <Image
              src={singleReview.image}
              fill
              style={{ objectFit: "contain" }}
              alt={singleReview.title}
            />
          </div>
          <div>
            <p className={single.title}>{singleReview.title}</p>
            <p className={single.release_date}>公開日：{date}</p>
            <p className={single.genre}>
              <span>ジャンル：</span>
              {genreArray.map((genre: string, index: number) => (
                <span className={single.genreChip} key={index}>
                  {genre}
                </span>
              ))}
            </p>
            <p className={single.overview}>
              あらすじ：
              <br />
              {singleReview.overview}
            </p>
            <p className={single.star}>{starReview}</p>
            <h3>感想</h3>
            <p
              className={single.thoughts}
              dangerouslySetInnerHTML={{
                __html: singleReview.thoughts.replace(/\n/g, "<br>"),
              }}
            ></p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
