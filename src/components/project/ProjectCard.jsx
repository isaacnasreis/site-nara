import React from 'react';

export default function ProjectCard({ title, category, imageUrl, slug }) {
  return (
    <a href={`/projects/${slug}`} className="block group relative overflow-hidden mb-8">
      <div className="overflow-hidden rounded-sm bg-gray-200 aspect-[3/4] or aspect-video">
        <img 
          src={imageUrl} 
          alt={title} 
          className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="mt-3 flex justify-between items-start opacity-80 group-hover:opacity-100 transition-opacity">
        <div>
          <h3 className="text-lg font-display leading-none text-ink">{title}</h3>
          <span className="text-xs font-sans uppercase tracking-wider text-ink/50">{category}</span>
        </div>
        <span className="text-accent opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
          →
        </span>
      </div>
    </a>
  );
}