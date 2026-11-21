import { AnimationLoop } from "./animation-loop";
import { Setup } from "./setup";

export function Vanilla() {
  return (
    <>
      {/* setup */}
      <Setup />

      {/* animation loop */}
      <AnimationLoop />
    </>
  );
}
