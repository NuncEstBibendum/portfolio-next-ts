import { GetStaticProps, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

export type GetStaticPropsWithSlug<
  P extends { [key: string]: unknown } = { [key: string]: unknown },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = GetStaticProps<P, Q, D>;
