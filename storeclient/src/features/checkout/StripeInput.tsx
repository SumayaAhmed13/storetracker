import { forwardRef, Ref, useImperativeHandle, useRef } from "react";

export const StripeInput = forwardRef(function StripeInput(
  { component: Component, ...props },
  ref: Ref<unknown>
) {
  const elementRef = useRef<any>();

  useImperativeHandle(ref, () => ({
    focus: () => elementRef.current.focus,
  }));
  return (
    <Component
      onReady={(element) => (elementRef.current = element)}
      {...props}
    />
  );
});
