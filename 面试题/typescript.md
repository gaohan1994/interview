# typescript 的 interface 和 props 区别

1、type 可以直接定义基础类型、元组、联合类型， interface 不行
2、interface 通过 extends 实现类型继承、type 通过 & 实现交叉类型

# typescript 的你经常用到的场景

- 高阶组件类型注入

- 剔除部分属性

# typescript 的逆变和协变

- 假设现在有 People 类型 Man 类型 Women 类型

```typescript
interface People {
  name: string;
}
interface Man extends People {
  sex: 'man';
}

let peoples: People[] = [];
let man: Man[] = [];

peoples = man; // ok
```

- 逆变 出现在函数类型的参数中出现

```typescript
let sayPeople = (people: People) => {};

let sayMan = (man: Man) => {};

sayMan = sayPeople; // ok
sayPeople = sayMan; // error 因为 sayPeople 无法处理 man
```

# typescript 的常用类型

```typescript
// 变为可选
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// pick返回 需要的属性类型
type Pick<T, U extends keyof T> = {
  [K in U]: T[K];
};

// Exclude 去掉指定的类型
type Exclude<T, U> = T extends U ? never : T;

// 取出公共类型并返回
type Extract<T, U> = T extends U ? T : never;
```

- 组合使用方法

```typescript
/**
 * @param 剔除掉某些属性
 *
 * type A = {
 *  name: string;
 *  age: number;
 * }
 * 剔除掉age
 */
type Omit<T, U> = Pick<T, Exclude<keyof T, U>>;

/**
 * 可递归调用
 */
type PowerPartial<T> = {
  [U in keyof T]?: T[U] extends Object ? PowerPartial<T[U]> : T[U];
};
```
