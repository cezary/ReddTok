import { useEffect } from "react";

import { useUIStore } from "@/lib/stores/ui";

export const useLandingModal = () => {
  const { setAlert, setMuted, setPaused } = useUIStore()
  useEffect(() => {
    if (!document.cookie.includes('visited=true')) {
      document.cookie = 'visited=true; expires=Fri, 31 Dec 9999 23:59:59 GMT'
    }
    setMuted(true);
    setPaused(true);
    setAlert({
      title: 'Welcome to ReddTok!',
      description: "ReddTok is a Tiktok-like client for Reddit short-form videos. ReddTok lets you watch videos from Reddit as if you were on TikTok.\n\nIf you have any feedback, please reach out to me on X @czarizard.",
    }, () => {
      setMuted(false)
      setPaused(false)
    });
  }, [setAlert, setMuted, setPaused])
}
