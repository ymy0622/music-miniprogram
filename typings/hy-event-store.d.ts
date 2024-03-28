declare module 'hy-event-store' {
  class HYEventBus {}

  class HYEventStore {
    state: Record<string, unknown>
    actions: Record<string, Function>

    constructor(options: {
      state?: Record<string, unknown>
      actions?: Record<string, any>
    })

    onState: (stateKey: string, stateCallback: Function) => void
    onStates: (statekeys: string[], stateCallback: Function) => void
    offState: (stateKey: string, stateCallback: Function) => void
    offStates: (stateKeys: string[], stateCallback: Function) => void
    setState: (stateKey: string, value: any) => void
    dispatch: (actionName: string, ...args: unknown[]) => void
  }
}
