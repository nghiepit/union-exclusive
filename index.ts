type Never<T> = {[P in keyof T]?: never};

// Referent https://github.com/sindresorhus/type-fest/blob/main/source/union-to-intersection.d.ts
type UnionToIntersection<Union> = (
  Union extends unknown ? (distributedUnion: Union) => void : never
) extends (mergedIntersection: infer Intersection) => void
  ? Intersection
  : never;

type UnionDistribute<Union, AllUnion> = Union extends any
  ? Union & Never<Omit<UnionToIntersection<AllUnion>, keyof Union>>
  : never;

export type UnionExclusive<Union> = UnionDistribute<
  Union,
  Exclude<Extract<Union, Record<string, any>>, Array<any>>
>;
