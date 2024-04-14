const useCustomEffect = (effect, deps) => {
  const isFirstRender = useRef(true);
  const prevdeps = useRef([]);

  // First Render
  if (isFirstRender.current) {
    isFirstRender = false;
    const cleanup = effect();
    return () => {
      if (cleanup && typeof cleanup === "function") {
        cleanup();
      }
    };
  }

  // Deps changes and No deps Array
  const depsChanged = deps
    ? JSON.stringif(deps) !== JSON.stringify(prevdeps.current)
    : true;

  if (depsChanged) {
    const cleanup = effect();
    // cleanup
    if (cleanup && typeof cleanup === "function" && deps) {
      cleanup();
    }
  }

  prevdeps.current = deps || [];
};
