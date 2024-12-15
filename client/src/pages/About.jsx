// Desc: About page
import React from "react";

export default function About() {
  return (
    <div className="py-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4 text-slate-800">
        About RoofGroove
      </h1>
      <p className="mb-4 text-slate-700">
        At <span className="font-semibold">RoofGroove</span>, we believe finding
        your perfect home should be an exciting journey, not a challenge. We’re
        more than just a property platform; we’re your partner in discovering
        spaces where you can truly belong. With a passion for connecting people
        to their dream homes, we offer a handpicked selection of properties
        designed to suit every lifestyle, taste, and budget.
      </p>
      <p className="mb-4 text-slate-700">
        Our mission is clear: to simplify the home-finding process and make it a
        seamless, enjoyable experience. From bustling city apartments to
        tranquil countryside retreats,{" "}
        <span className="font-semibold">RoofGroove</span> brings the best
        options right to your fingertips. You’re not just searching for a
        house—you’re stepping into a space where your story begins, and we’re
        here to help you every step of the way.
      </p>
      <p className="mb-4 text-slate-700">
        We envision a future where finding a dream home is effortless, inspiring
        confidence and joy. By continually enhancing our platform, we aim to
        create a community where dreams come alive and possibilities are
        endless. Whether it’s a cozy studio, a family-friendly neighborhood, or
        the perfect sunset view, we’re committed to helping you find a space
        where memories are made and lives are built.
      </p>
      <p className="mb-4 text-slate-700">
        Combining advanced technology with a personal touch,{" "}
        <span className="font-semibold">RoofGroove</span> delivers a tailored
        experience that puts your needs first. Our detailed listings,
        transparent insights, and curated recommendations ensure that every
        search leads you closer to a property that feels{" "}
        <span className="italic">just right</span>. Welcome to{" "}
        <span className="font-semibold">RoofGroove</span>—where your perfect
        place is waiting.
      </p>
      <div className="mt-10 p-6 bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
        <h3 className="text-xl font-semibold text-gray-700 mb-3">
          Ready to find your dream home?
        </h3>
        <p className="text-gray-600">
          At RoofGroove, we make your home search easy, enjoyable, and tailored
          just for you. Join us today and explore the possibilities.
        </p>
        <div className="mt-4">
          <a
            href="/search"
            className="bg-red-400 text-white font-semi-bold py-2 px-4 rounded-lg "
          >
            Start your journey
          </a>
        </div>
      </div>
    </div>
  );
}
