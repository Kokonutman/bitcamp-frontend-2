"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Star, Medal, Award, Crown, Sun } from "lucide-react";

interface Milestone {
  days: number;
  label: string;
  description: string;
  achieved: boolean;
  icon: React.ElementType;
}

export function MilestoneTracker() {
  const [milestones, setMilestones] = useState<Milestone[]>([
    { 
      days: 1, 
      label: "Initial Achievement",
      description: "You've taken the courageous first step on your journey to recovery.",
      achieved: false,
      icon: Star
    },
    { 
      days: 7, 
      label: "First Week Milestone",
      description: "A full week of strength and dedication. You're building momentum!",
      achieved: false,
      icon: Medal
    },
    { 
      days: 30, 
      label: "Thirty Day Achievement",
      description: "30 days of choosing yourself. New positive habits are forming.",
      achieved: false,
      icon: Trophy
    },
    { 
      days: 90, 
      label: "Quarterly Milestone",
      description: "90 days of transformation. Your resilience inspires others.",
      achieved: false,
      icon: Crown
    },
    { 
      days: 180, 
      label: "Six Month Achievement",
      description: "Six months of dedication. Your strength has become an inspiration.",
      achieved: false,
      icon: Award
    },
    { 
      days: 365, 
      label: "One Year Milestone",
      description: "A full year of triumph. You've proven that anything is possible.",
      achieved: false,
      icon: Sun
    }
  ]);

  const [currentDays, setCurrentDays] = useState(30);
  const [hoveredMilestone, setHoveredMilestone] = useState<number | null>(null);

  useEffect(() => {
    const updatedMilestones = milestones.map(milestone => ({
      ...milestone,
      achieved: currentDays >= milestone.days
    }));
    setMilestones(updatedMilestones);
  }, [currentDays]);

  const firstRow = milestones.slice(0, 3);
  const secondRow = milestones.slice(3);

  return (
    <div className="section-container max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-16">
        <h2 className="text-3xl font-bold text-foreground/90 font-heading">Recovery Progress</h2>
        <div className="text-right">
          <p className="text-5xl font-bold text-primary font-heading">{currentDays}</p>
          <p className="text-sm text-muted-foreground">Days in Recovery</p>
        </div>
      </div>

      <div className="space-y-20">
        {/* First Row */}
        <div className="grid grid-cols-3 gap-8">
          {firstRow.map((milestone, index) => {
            const Icon = milestone.icon;
            return (
              <motion.div
                key={index}
                className="group relative"
                onMouseEnter={() => setHoveredMilestone(index)}
                onMouseLeave={() => setHoveredMilestone(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full 
                    flex items-center justify-center transition-all duration-300
                    ${milestone.achieved 
                      ? 'bg-primary shadow-lg shadow-primary/20' 
                      : 'bg-secondary/50'}`}
                  animate={{
                    scale: hoveredMilestone === index ? 1.1 : 1,
                    y: hoveredMilestone === index ? -2 : 0
                  }}
                >
                  <Icon className={`w-6 h-6 ${milestone.achieved ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </motion.div>

                <div className={`p-6 rounded-xl h-full transition-all duration-300
                  ${milestone.achieved 
                    ? 'bg-primary/5 border border-primary/20' 
                    : 'bg-secondary/5 border border-secondary/20'}
                  ${hoveredMilestone === index ? 'transform -translate-y-1' : ''}`}
                >
                  <div className="pt-4 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-semibold text-foreground/90">{milestone.label}</h3>
                      <span className="text-sm font-medium text-muted-foreground">{milestone.days}d</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Second Row */}
        <div className="grid grid-cols-3 gap-8">
          {secondRow.map((milestone, index) => {
            const Icon = milestone.icon;
            const globalIndex = index + 3;
            return (
              <motion.div
                key={globalIndex}
                className="group relative"
                onMouseEnter={() => setHoveredMilestone(globalIndex)}
                onMouseLeave={() => setHoveredMilestone(null)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: globalIndex * 0.1 }}
              >
                <motion.div
                  className={`absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full 
                    flex items-center justify-center transition-all duration-300
                    ${milestone.achieved 
                      ? 'bg-primary shadow-lg shadow-primary/20' 
                      : 'bg-secondary/50'}`}
                  animate={{
                    scale: hoveredMilestone === globalIndex ? 1.1 : 1,
                    y: hoveredMilestone === globalIndex ? -2 : 0
                  }}
                >
                  <Icon className={`w-6 h-6 ${milestone.achieved ? 'text-primary-foreground' : 'text-muted-foreground'}`} />
                </motion.div>

                <div className={`p-6 rounded-xl h-full transition-all duration-300
                  ${milestone.achieved 
                    ? 'bg-primary/5 border border-primary/20' 
                    : 'bg-secondary/5 border border-secondary/20'}
                  ${hoveredMilestone === globalIndex ? 'transform -translate-y-1' : ''}`}
                >
                  <div className="pt-4 space-y-2">
                    <div className="flex items-baseline justify-between">
                      <h3 className="text-lg font-semibold text-foreground/90">{milestone.label}</h3>
                      <span className="text-sm font-medium text-muted-foreground">{milestone.days}d</span>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}