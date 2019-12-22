import { Component, ComponentConstructor, Entity } from 'ecsy';

declare module 'ecsy' {
  /**
   * A system that manipulates entities in the world.
   */
  export abstract class System {
    /**
     * Defines what Components the System will query for.
     * This needs to be user defined.
     */
    static queries: {
      [queryName: string]: {
        components: (Component | NotComponent)[];
        listen?: {
          added?: boolean;
          removed?: boolean;
          changed?: boolean | Component[];
        };
      };
    };

    /**
     * The results of the queries.
     * Should be used inside of execute.
     */
    queries: {
      [queryName: string]: {
        results: Entity[];
        added: Entity[];
        removed: Entity[];
        changed: Entity[];
      };
    };

    /**
     * Whether the system will execute during the world tick.
     */
    enabled: boolean;
    /**
     * Resume execution of this system.
     */
    play(): void;

    /**
     * Stop execution of this system.
     */
    stop(): void;

    /**
     * This function is called for each run of world.
     * All of the `queries` defined on the class are available here.
     * @param delta
     * @param time
     */
    abstract execute(delta: number, time: number): void;
  }

  export interface SystemConstructor<T extends System> {
    new (...args: any): T;
  }

  export interface NotComponent {
    type: 'not';
    Component: Component;
  }

  /**
   * Use the Not class to negate a component query.
   */
  export function Not<T>(Component: ComponentConstructor<T>): NotComponent;
}
