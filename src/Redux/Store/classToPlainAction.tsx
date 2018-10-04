// inspired by https://medium.com/@martin_hotell/redux-typescript-typed-actions-with-less-keystrokes-d984063901d
export const classToPlainAction: any = (store: any) => (next: any) => (action: any) => {
    if (action.__proto__) {
        return next({...action});
    } else {
        return next(action);
    }
};
