export interface NormalizedYoutube {
  title: string;
  link: string;
}

export interface YoutubeResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionConde: string;
  pageInfo: object;
  items: [
    {
      kind: string;
      etag: string;
      id: {
        kind: string;
        videoId: string;
      };
      snippet: {
        title: string;
      };
    }
  ];
}
