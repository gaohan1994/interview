function curry(executer, ...restArguments) {
  let args = restArguments || [];
  // executer 需要几个参数
  const executerArgumentsLength = executer.length;

  return function curriedExecuter(...curriedArguments) {
    const executeArguments = args.concat(curriedArguments);

    if (executeArguments.length < executerArgumentsLength) {
      return curry.call(this, executer, executeArguments);
    }

    return executer.apply(this, executeArguments);
  };
}
