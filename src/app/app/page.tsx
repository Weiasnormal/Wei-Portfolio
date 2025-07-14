import React from 'react';
import Header from "../components/Header";

function HomePage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-6">
        <section id="home" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Welcome to Wei Portfolio</h2>
          <p className="text-gray-600 mt-4">Explore my projects and skills.</p>
        </section>
        <section id="about" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-4">I am a passionate developer with a love for creating innovative solutions.</p>
        </section>
        <section id="projects" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
          <p className="text-gray-600 mt-4">Check out some of my recent work.</p>
        </section>
        <section id="contact">
          <h2 className="text-3xl font-bold text-gray-800">Contact Me</h2>
          <p className="text-gray-600 mt-4">Feel free to reach out for collaborations or inquiries.</p>
        </section>
      </main>
    </div>
  );
}