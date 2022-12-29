/// <reference types='codeceptjs' />
type steps_file = typeof import('./steps_file.js');

declare namespace CodeceptJS {
  interface SupportObject { I: I, current: any }
  interface CallbackOrder { [0]: CodeceptJS.I }
  interface Methods extends CodeceptJs.Puppeteer {}
  interface I extends ReturnType<steps_file> {}
  namespace Translation {
    interface Actions {}
  }
}
