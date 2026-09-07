const VIDEO_SRC =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/Google%20Videos_Clip%204.mp4";

const POSTER_SRC =
  "https://vmsgvrvjo3qlecsp.public.blob.vercel-storage.com/zed-law-intro-poster.jpg";

// The clip is a 1080×1920 vertical talking-head with burned-in captions, so
// the frame is held at 9/16 and kept narrow rather than run full-bleed —
// a full-width portrait video would tower over the fold on desktop.
//
// Framed like the snapshots in the hero (white matte, soft warm shadow) so
// it reads as another print left on the desk. `preload="none"` means none of
// the ~49MB of video is fetched until the visitor presses play; the poster
// frame is all that loads with the page, and `aspect-[9/16]` reserves its box
// up front so nothing shifts.
export function VideoIntro() {
  return (
    <section className="border-y border-line bg-paper-2">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:gap-16">
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

          <div className="view-reveal mx-auto w-full max-w-[15rem] sm:max-w-[17rem] lg:max-w-none">
            <video
              className="block aspect-[9/16] w-full border-[6px] border-white bg-night object-cover shadow-[0_10px_26px_rgba(30,24,12,0.22)]"
              poster={POSTER_SRC}
              preload="none"
              controls
              muted
              playsInline
              aria-label="Introduction to Zed Law"
            >
              <source src={VIDEO_SRC} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </div>
    </section>
  );
}
