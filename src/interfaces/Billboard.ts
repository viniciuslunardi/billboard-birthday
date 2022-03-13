import { NormalizedYoutube } from './Youtube';

export interface BillboardReponse {
  info: {
    category: string;
    chart: string;
    date: string;
    source: string;
  };
  content: {
    '1': {
      rank: string;
      title: string;
      artist: string;
      'weeks at no.1': string;
      'last week': string;
      'peak position': string;
      'weeks on chart': string;
      detail: string;
    };
  };
  ERROR?: string;
}

export interface NormalizedBillboard {
  rank: string;
  title: string;
  artist: string;
  weeks_at_num_1: string;
  peak_position: string;
  weeks_on_chart: string;
}

export interface BillboardBirthdayReponse {
  rank: string;
  title: string;
  artist: string;
  weeks_at_num_1: string;
  peak_position: string;
  weeks_on_chart: string;
  youtube: NormalizedYoutube;
}
