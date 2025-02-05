import React, { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

export default function ExpandableParagraph({ children, clampClassName }: React.PropsWithChildren<{ clampClassName: string }>) {
  const [expanded, setExpanded] = useState(false);
  const [clamped, setClamped] = useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

  const descriptionRef = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    if (!descriptionRef.current) {
      return;
    }

    // https://stackoverflow.com/a/52650163
    const isClamped = descriptionRef.current.offsetHeight < descriptionRef.current.scrollHeight;
    setClamped(isClamped);
  }, [])

  return (
    <p>
      <span
        className={cn('mr-2', {
          [clampClassName]: !expanded,
        })}
        onClick={handleExpandClick}
        ref={descriptionRef}
      >
        {children}
      </span>
      {clamped ? (
        <span className='font-bold cursor-pointer' onClick={handleExpandClick}>{expanded ? 'Read less' : 'Read more'}</span>
      ) : null}
    </p>
  )
}
