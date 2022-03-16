type BacisType = string | number | boolean | Date;

type Match<T1, T2> = T1 extends T2 ? (T2 extends T1 ? true : false) : false;

/**
 * 获取所有JsonPath
 * @param {type} LeafType 可以指定叶子节点的类型，用来停止深度遍历；也可以提升性能
 */
export type GetJsonPathKeys<T, LeafType = never> = _GetJsonPathKeys<
  T,
  LeafType
>;
type _GetJsonPathKeys<T, LeafType = never, Path extends string = ""> = keyof {
  [key in keyof T as key extends string
    ? Match<T[key], (args: any) => any> extends true
      ? never
      : Match<T[key], any> extends true
      ? `${Path}${key}`
      : T[key] extends BacisType | LeafType
      ? `${Path}${key}`
      : T[key] extends Array<BacisType | LeafType>
      ? `${Path}${key}`
      : T[key] extends Array<any>
      ?
          | `${Path}${key}`
          | `${Path}${key}[]`
          | _GetJsonPathKeys<T[key][number], LeafType, `${Path}${key}[].`>
      : `${Path}${key}` | _GetJsonPathKeys<T[key], LeafType, `${Path}${key}.`>
    : never]: string;
};
export type GetTypeByJsonPath<
  T,
  Path extends GetJsonPathKeys<T, LeafType>,
  LeafType = never
> = Path extends `${infer ParentPath}[].${infer Key}`
  ? Key extends keyof T[ParentPath][number]
    ? T[ParentPath][number][Key]
    : GetTypeByJsonPath<T[ParentPath][number], Key, LeafType>
  : Path extends `${infer ParentPath}[]`
  ? T[ParentPath][number]
  : Path extends `${infer ParentPath}.${infer Key}`
  ? Key extends keyof T[ParentPath]
    ? T[ParentPath][Key]
    : GetTypeByJsonPath<T[ParentPath], Key, LeafType>
  : Path extends keyof T
  ? T[Path]
  : never;
