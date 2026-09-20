import React, { useState } from 'react';
import { PROJECTS_DATA } from '../data/projectsData';
import { Code } from 'lucide-react';

import { Badge } from '../components/common/Badge';

export const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState(PROJECTS_DATA[0]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div className="space-y-2">
        <Badge variant="amber" mono>Hands-On Portfolio</Badge>
        <h1 className="text-3xl font-extrabold text-white">Security Engineering Mini-Projects</h1>
        <p className="text-sm text-slate-400">
          Build production-ready security utilities to showcase real engineering competency.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Side: Projects Cards */}
        <div className="space-y-4">
          {PROJECTS_DATA.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className={`p-5 rounded-2xl border cursor-pointer transition-all space-y-3 ${
                selectedProject.id === proj.id
                  ? 'bg-[#1A2234] border-amber-500/60 shadow-lg shadow-amber-500/10'
                  : 'bg-[#121824] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between">
                <Badge variant="cyan" mono size="sm">{proj.category}</Badge>
                <span className="text-xs font-mono text-emerald-400">+{proj.xpReward} XP</span>
              </div>

              <h3 className="text-base font-bold text-white">{proj.title}</h3>
              <p className="text-xs text-slate-400 line-clamp-2">{proj.shortDescription}</p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                {proj.technologies.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Right Side: Step-by-Step Project Implementation Guide */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#121824] p-8 rounded-2xl border border-slate-800 space-y-6">
            
            <div className="space-y-3 border-b border-slate-800 pb-5">
              <div className="flex items-center gap-2">
                <Badge variant="amber" mono>{selectedProject.category}</Badge>
                <span className="text-xs font-mono text-slate-400">• Estimated {selectedProject.estimatedHours} Hours</span>
              </div>
              <h2 className="text-2xl font-bold text-white">{selectedProject.title}</h2>
              <p className="text-sm text-slate-300 leading-relaxed">{selectedProject.shortDescription}</p>
            </div>

            {/* Architecture Overview */}
            <div className="space-y-2 bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-xs">
              <span className="text-cyan-400 font-bold block">System Architecture Overview:</span>
              <p className="text-slate-300 leading-relaxed">{selectedProject.architectureOverview}</p>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="space-y-6">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Code className="w-4 h-4 text-cyan-400" /> Implementation Steps
              </h3>

              {selectedProject.steps.map((step) => (
                <div key={step.stepNumber} className="space-y-3 bg-slate-950 p-5 rounded-xl border border-slate-800">
                  <div className="flex items-center gap-2 font-mono text-xs font-bold text-amber-400">
                    <span>Step {step.stepNumber}:</span>
                    <span className="text-white">{step.title}</span>
                  </div>
                  <p className="text-xs text-slate-400">{step.description}</p>

                  {step.codeSnippet && (
                    <div className="bg-[#090D14] p-4 rounded-lg border border-slate-800 text-xs font-mono text-cyan-300 overflow-x-auto">
                      <pre>{step.codeSnippet}</pre>
                    </div>
                  )}
                </div>
              ))}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
