type Never<T> = {[P in keyof T]?: never};

// Reference https://github.com/sindresorhus/type-fest/blob/main/source/union-to-intersection.d.ts
type UnionToIntersection<Union> = (
  Union extends unknown ? (distributedUnion: Union) => void : never
) extends (mergedIntersection: infer Intersection) => void
  ? Intersection
  : never;

type UnionDistribute<U1, U2> = U1 extends any
  ? U1 & Never<Omit<UnionToIntersection<U2>, keyof U1>>
  : never;

export type Union<U> = UnionDistribute<
  U,
  Exclude<Extract<U, Record<string, any>>, Array<any>>
>;
