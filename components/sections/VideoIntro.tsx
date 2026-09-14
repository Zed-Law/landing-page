"use client";

import * as React from "react";
import { VolumeX } from "lucide-react";

const VIDEO_SRC =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/Google%20Videos_Clip%204.mp4";

const POSTER_SRC =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-law-intro-poster.jpg";

// The clip is a 1080×1920 vertical talking-head with burned-in captions, so
// the frame is held at its native 9/16 in a narrow centred column — 400px on
// desktop, full width on mobile. `object-contain` letterboxes instead of
// cropping, so the captions can never be cut off at the edges.
//
// Framed like the snapshots in the hero (white matte, soft warm shadow) so
// it reads as another print left on the desk. It plays muted on loop the
// moment it can — the burned-in captions carry the message without audio —
// and the overlaid button hands sound back to anyone who wants it.
// `aspect-[9/16]` reserves the box up front so nothing shifts.
export function VideoIntro() {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = React.useState(true);

  // The native controls can mute and unmute too, so the button's label
  // follows the element rather than only our own clicks.
  React.useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const sync = () => setIsMuted(video.muted || video.volume === 0);
    sync();

    video.addEventListener("volumechange", sync);
    return () => video.removeEventListener("volumechange", sync);
  }, []);

  const unmute = () => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = false;
    setIsMuted(false);
    // If autoplay was refused (iOS Low Power Mode, a data saver), this click
    // is the user gesture that gets it going.
    void video.play().catch(() => {});
  };

  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,25rem)] lg:gap-16">
          <div>
            <h2 className="view-reveal font-mono text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-muted">
              Watch
            </h2>
            <p className="view-reveal mt-6 max-w-[22ch] text-4xl leading-tight text-ink [font-family:var(--font-jubilee-heading)] sm:text-5xl">
              A quick hello,{" "}
              <span className="text-muted">before the fine print.</span>
            </p>
            <p className="view-reveal mt-5 max-w-md text-lg text-body">
              Half a minute on who we are and how we work — so you know
              exactly who you&apos;re talking to before you book a call.
            </p>
          </div>

          <div className="view-reveal relative mx-auto w-full max-w-[25rem]">
            <video
              ref={videoRef}
              className="block aspect-[9/16] w-full border-[6px] border-white bg-night object-contain shadow-[0_10px_26px_rgba(30,24,12,0.22)]"
              poster={POSTER_SRC}
              preload="metadata"
              controls
              autoPlay
              loop
              muted
              playsInline
              aria-label="Introduction to Zed Law"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {isMuted && (
              <button
                type="button"
                onClick={unmute}
                // Sits clear of the native control bar at the bottom of the frame.
                className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-ink/85 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm transition-colors hover:bg-ink"
              >
                <VolumeX className="h-3.5 w-3.5" aria-hidden="true" />
                Tap for sound
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
