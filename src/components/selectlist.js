(() => ({
  name: 'selectlist',
  type: 'BODY_COMPONENT',
  allowedTypes: [],
  orientation: 'HORIZONTAL',
  jsx: (() => {
    const { env, model } = B;
    const isDev = env === 'dev';

    if(isDev){
        return (
        <div>
        <button>een button!</button>
        </div>
        )
    }
  })(),
  styles: B => theme => {
    const style = new B.Styling(theme);
    return {
      root: {},
    };
  },
}))();