import React from 'react';

type ComponentBaseProps = {
  name: string;
  age: number;
  sex: 'man' | 'feman';
  circle: {
    name: string
  }
}



type MyPartial<T> = {
  [P in keyof T]?: T[P];
}


type PartPartial<T, U extends keyof T> = {
  [K in keyof T]: K extends U
  ? Partial<T[K]>
  : T[K]
}

type PartialCp = MyPartial<ComponentBaseProps>;
type MyPick<T, K extends keyof T> = {
  [P in K]: T[K];
}
type PickName = MyPick<ComponentBaseProps, 'name'>;

type MyExclude<T, U> = T extends U ? never : T;
type MyExtract<T, U> = T extends U ? T : never;
type Omit<T, K> = Pick<T, MyExclude<keyof T, K>>;

type PickCommon<T, K> = Pick<T, MyExtract<keyof T, K>>;
type ComponentWithOutName = PickCommon<ComponentBaseProps, "name" | 'man'>;

type PowerPartial<T> = {
  [K in keyof T]?: T[K] extends Object
  ? PowerPartial<T[K]>
  : T[K]
}
type Pcbp = PowerPartial<ComponentBaseProps>;

class ComponentBase extends React.Component<ComponentBaseProps> {
  render() {
    const { name = 'ghan' } = this.props;

    return (
      <div>{name}</div>
    )
  }
}

const InjectAttributeAHoc = () => {

  return (CompHoc) => {
    return <CompHoc {...this.props} />
  }
}

class People {
  public name: string;
  constructor(name) {
    this.name = name;
  }
}

class Man extends People {
  public sex: string;
  constructor(name) {
    super(name);
    this.sex = 'Man';
  }
}


class WoMan extends People {
  public sex: string;
  constructor(name) {
    super(name);
    this.sex = 'WoMan';
  }
}

let p1: People;
let m1: Man;

let pf1 = (people: People) => {
  people.name
}

let pf2 = (man: Man) => {
  man.sex
}

interface A {
  a: string;
}

interface B {
  b: string;
}
