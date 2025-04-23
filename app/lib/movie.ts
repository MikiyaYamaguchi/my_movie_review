//映画ジャンル取得API
export const getMovieGenre = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=652fd3b22f85b91d1bea2f391e7efe20&language=ja`
    );

    if (!response.ok) {
      throw new Error("ジャンルの取得に失敗しました");
    }

    const data = await response.json();
    return data.genres;
  } catch (err) {
    console.error("ジャンルの取得に失敗しました", err);
    throw new Error("ジャンルの取得に失敗しました");
  }
};

//5つの映画ジャンルをランダムに取得API
export const getFiveMovieGenre = async () => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=652fd3b22f85b91d1bea2f391e7efe20&language=ja`
    );

    if (!response.ok) {
      throw new Error("ジャンルの取得に失敗しました");
    }

    const data = await response.json();
    return data.genres.sort(() => Math.random() - 0.5).slice(0, 5);
  } catch (err) {
    console.error("ジャンルの取得に失敗しました", err);
    throw new Error("ジャンルの取得に失敗しました");
  }
};

//映画タイトルに基づいて映画情報を取得するAPI
export const getMovieByTitle = async (title: string) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=652fd3b22f85b91d1bea2f391e7efe20&query=${encodeURIComponent(
        title
      )}&language=ja`
    );

    if (!response.ok) {
      throw new Error("映画情報の取得に失敗しました");
    }

    const data = await response.json();

    if (data.results.length <= 0) {
      throw new Error("映画が見つかりませんでした");
    } else {
      return data.results;
    }
  } catch (err) {
    console.error("TMDb APIエラー:", err);
    return [];
  }
};