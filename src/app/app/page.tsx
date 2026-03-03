import React from 'react';
import Header from "../components/Header";

export default function HomePage() {
  return (
    <div>
      <Header />
      <main className="container mx-auto px-4 py-10">
        <section id="home" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Welcome</h2>
          <p className="text-gray-600 mt-4">This is the main portfolio page.</p>
        </section>
        <section id="about" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">About Me</h2>
          <p className="text-gray-600 mt-4">Short introduction and background.</p>
        </section>
        <section id="projects" className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800">Projects</h2>
          <p className="text-gray-600 mt-4">Project highlights will appear here.</p>
        </section>
        <section id="contact">
          <h2 className="text-3xl font-bold text-gray-800">Contact Me</h2>
          <p className="text-gray-600 mt-4">Contact details and links.</p>
        </section>
      </main>
    </div>
  );
}