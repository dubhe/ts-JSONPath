import { GetJsonPathKeys, GetTypeByJsonPath } from "./index";
interface LeafType {
  name: string;
}

interface test {
  prop1: string;
  level1: {
    level2: {
      level3: {
        leaf: {
          name: string;
        };
      };
    };
    level1_leaf: LeafType;
  };
}

let jsonpath: GetJsonPathKeys<test, LeafType> = "level1.level2.level3.leaf";

type f = GetTypeByJsonPath<test, "level1.level2.level3.leaf">;
