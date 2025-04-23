import Link from "next/link";
import ReviewList from "./components/reviewList";
import { getFiveMovieGenre } from "./lib/movie";
import { getAllReviews, getReviewByGenre, getReviewByStar } from "./lib/review";

interface Review {
  _id: string;
  title: string;
  release_date: Date;
  genre: string;
  image: string;
  star: number;
  thoughts: string;
}

const Home = async () => {
  const allReviews = await getAllReviews(8);
  const reviewsByStarFive = await getReviewByStar(5, 8);
  const reviewsByStarFour = await getReviewByStar(4, 8);
  const reviewsByStarThree = await getReviewByStar(3, 8);
  const fiveGenres = await getFiveMovieGenre();

  const reviewByGenres: Review[][] = [];

  for (let i = 0; i < fiveGenres.length; i++) {
    const genre = fiveGenres[i];
    const reviews = await getReviewByGenre(genre.name, 8);
    reviewByGenres[i] = reviews;
  }
  return (
    <>
      <section>
        <h2>新着レビュー</h2>
        <ReviewList reviews={allReviews} />
        <Link href="/review/new" className="more">
          新着レビューをもっと見る
        </Link>
      </section>
      <section>
        <h2>星5のレビュー</h2>
        {reviewsByStarFive.length ? (
          <>
            <ReviewList reviews={reviewsByStarFive} />
            <Link href="/review/star/5" className="more">
              星5のレビューをもっと見る
            </Link>
          </>
        ) : (
          <p>レビューがありません。</p>
        )}
      </section>
      <section>
        <h2>星4のレビュー</h2>
        {reviewsByStarFour.length ? (
          <>
            <ReviewList reviews={reviewsByStarFour} />
            <Link href="/review/star/4" className="more">
              星4のレビューをもっと見る
            </Link>
          </>
        ) : (
          <p>レビューがありません。</p>
        )}
      </section>
      <section>
        <h2>星3のレビュー</h2>
        {reviewsByStarThree.length ? (
          <>
            <ReviewList reviews={reviewsByStarThree} />
            <Link href="/review/star/3" className="more">
              星3のレビューをもっと見る
            </Link>
          </>
        ) : (
          <p>レビューがありません。</p>
        )}
      </section>
      {fiveGenres.map((genre: { id: number; name: string }, index: number) => (
        <section key={genre.id}>
          <h2>{genre.name}</h2>
          {reviewByGenres[index].length ? (
            <>
              <ReviewList reviews={reviewByGenres[index]} />
              <Link href={`/review/genre?genre=${genre.name}`} className="more">
                {genre.name}のレビューをもっと見る
              </Link>
            </>
          ) : (
            <p>レビューがありません。</p>
          )}
        </section>
      ))}
    </>
  );
};

export default Home;
