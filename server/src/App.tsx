import { createSignal } from "solid-js";
export default function App() {
  const [count, setCount] = createSignal(0);
  return (
    <main>
      <h1>Solid SSR + Elysia</h1>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>+1</button>
    </main>
  );
}