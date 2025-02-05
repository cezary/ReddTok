// https://github.com/leandrocunha/react-hls/blob/master/src/index.tsx see: https://github.com/devcshort/react-hls/issues/50#issuecomment-2310967424
import React, { useEffect, RefObject } from 'react';

import Hls, { HlsConfig } from 'hls.js';

export enum HlsMimeType {
  M3U8 = 'application/vnd.apple.mpegurl',

  M4A = 'audio/mp4',

  M4S = 'video/iso.segment',

  M4V = 'video/mp4',

  // eslint-disable-next-line @typescript-eslint/no-duplicate-enum-values
  MP4 = 'video/mp4',

  TS = 'video/mp2t',
}

export interface HlsPlayerProps
  extends React.VideoHTMLAttributes<HTMLVideoElement> {
  hlsConfig?: HlsConfig;

  playerRef: RefObject<HTMLVideoElement | null>;

  src: string;

  type?: HlsMimeType;
}

function supportsHls() {
  if (typeof self === 'undefined') return true;

  return self.document.createElement('video').canPlayType('application/vnd.apple.mpegURL') !== '';
}

function ReactHlsPlayer({
  hlsConfig,

  playerRef = React.createRef<HTMLVideoElement>(),

  ...props
}: HlsPlayerProps) {
  useEffect(() => {
    let hls: Hls;

    function _initPlayer() {
      if (hls != null) {
        hls.destroy();
      }

      const newHls = new Hls({
        enableWorker: false,

        ...hlsConfig,
      });

      if (playerRef.current != null) {
        newHls.attachMedia(playerRef.current);
      }

      newHls.on(Hls.Events.MEDIA_ATTACHED, () => {
        newHls.loadSource(props.src);

        newHls.on(Hls.Events.MANIFEST_PARSED, () => {
          if (props.autoPlay) {
            playerRef?.current

              ?.play()

              .catch(() =>
                console.log(
                  'Unable to autoplay prior to user interaction with the dom.'
                )
              );
          }
        });
      });

      newHls.on(Hls.Events.ERROR, function (event, data) {
        console.log('error', Hls.Events.ERROR, event, data);
        if (data.fatal) {
          switch (data.type) {
            case Hls.ErrorTypes.NETWORK_ERROR:
              newHls.startLoad();

              break;

            case Hls.ErrorTypes.MEDIA_ERROR:
              newHls.recoverMediaError();

              break;

            default:
              _initPlayer();

              break;
          }
        }
      });

      hls = newHls;
    }

    // Check for Media Source support

    if (!supportsHls() && Hls.isSupported()) {
      _initPlayer();
    }

    return () => {
      if (hls != null) {
        hls.destroy();
      }
    };
  }, [props.autoPlay, hlsConfig, playerRef, props.src]);

  // If HLS is natively supported, use html video

  if (supportsHls()) return <video ref={playerRef} {...props} />;

  // If Media Source is supported, use HLS.js to play video

  if (Hls.isSupported()) return <video ref={playerRef} {...props} />;

  // Fallback to using a regular video player if HLS is supported by default in the user's browser

  return <video ref={playerRef} {...props} />;
}

export default ReactHlsPlayer;