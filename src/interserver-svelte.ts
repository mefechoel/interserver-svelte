import { onMount } from "svelte";
import { writable, Readable } from "svelte/store";
import interserver, {
  InterserverOptions,
  InterserverUnsubscribe,
} from "interserver";

export { InterserverOptions };

// Svelte does not export these types. They are copied from the source
type Subscriber<T> = (value: T) => void;
type Unsubscriber = () => void;

function createInterserver(
  container: Element,
  options?: InterserverOptions,
): Readable<boolean>;
function createInterserver(
  getContainer: () => Element,
  options?: InterserverOptions,
): Readable<boolean>;

/**
 * Create a store that exposes the visibility of a given container element
 * as a value.
 *
 * @param container The DOM element that will be observed
 * or a function that returns it.
 * @param options The observer options,
 * consisting of offset margins for the container (`top`, `right`, `bottom`, `left`)
 * and `once`. With `once` set to `true`,
 * observing stops after the element is first intersecting.
 * @param options.top top margin
 * @param options.right right margin
 * @param options.bottom bottom margin
 * @param options.left left margin
 * @param options.once If true, stop observing after first intersection.
 *
 * @returns The readable Svelte store
 */
function createInterserver(
  container: Element | (() => Element),
  options?: InterserverOptions,
): Readable<boolean> {
  const { subscribe, set } = writable(false);
  let unobserve: InterserverUnsubscribe;
  onMount(() => {
    const containerNode =
      typeof container === "function" ? container() : container;
    unobserve = interserver(containerNode, set, options);
  });
  // Make use of Svelte's auto store unsubscription
  // and cancel `IntersectionObserver` on unmount
  const customSubscribe = (run: Subscriber<boolean>): Unsubscriber => {
    const unsubscribe = subscribe(run);
    return () => {
      if (unobserve) unobserve();
      unsubscribe();
    };
  };
  return { subscribe: customSubscribe };
}

export default createInterserver;
