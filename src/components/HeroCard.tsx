
import { Shield, Bolt, Star, ChevronDown } from "lucide-react";
import { Card } from "@/components/ui/card";
import { useState } from "react";

interface HeroPowerstats {
  intelligence: string;
  strength: string;
  speed: string;
  durability: string;
  power: string;
  combat: string;
}

interface HeroCardProps {
  name: string;
  image: string;
  powerstats: HeroPowerstats;
  biography: {
    fullName: string;
    publisher: string;
  };
  appearance?: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
  };
  work?: {
    occupation: string;
    base: string;
  };
  connections?: {
    groupAffiliation: string;
    relatives: string;
  };
}

export const HeroCard = ({ name, image, powerstats, biography, appearance, work, connections }: HeroCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const PowerstatBar = ({ value, label }: { value: string; label: string }) => (
    <div className="space-y-1">
      <div className="flex justify-between text-sm">
        <span className="text-gray-600">{label}</span>
        <span className="text-hero-600 font-medium">{value}</span>
      </div>
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-hero-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${parseInt(value) || 0}%` }}
        />
      </div>
    </div>
  );

  const DetailSection = ({ title, content }: { title: string; content: string | string[] }) => (
    <div className="space-y-1">
      <h3 className="text-sm font-medium text-gray-600">{title}</h3>
      <p className="text-sm text-gray-800">
        {Array.isArray(content) ? content.join(" / ") : content}
      </p>
    </div>
  );

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl animate-fade-in">
      <div className="relative h-[400px] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6 text-white">
          <h2 className="text-3xl font-bold mb-2">{name}</h2>
          <p className="text-gray-300">{biography.fullName}</p>
          {biography.publisher && (
            <span className="inline-flex items-center px-3 py-1 mt-2 rounded-full text-xs font-medium bg-hero-500/30 backdrop-blur-sm text-white">
              {biography.publisher}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-hero-500" />
            <div className="text-2xl font-bold text-hero-600">{powerstats.durability}</div>
            <div className="text-sm text-gray-500">Defense</div>
          </div>
          <div className="text-center">
            <Bolt className="w-8 h-8 mx-auto mb-2 text-hero-500" />
            <div className="text-2xl font-bold text-hero-600">{powerstats.power}</div>
            <div className="text-sm text-gray-500">Power</div>
          </div>
          <div className="text-center">
            <Star className="w-8 h-8 mx-auto mb-2 text-hero-500" />
            <div className="text-2xl font-bold text-hero-600">{powerstats.combat}</div>
            <div className="text-sm text-gray-500">Combat</div>
          </div>
        </div>

        <div className="space-y-4">
          <PowerstatBar value={powerstats.intelligence} label="Intelligence" />
          <PowerstatBar value={powerstats.strength} label="Strength" />
          <PowerstatBar value={powerstats.speed} label="Speed" />
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 text-hero-600 hover:text-hero-700 transition-colors"
        >
          <span>{isExpanded ? "Show Less" : "Show More Details"}</span>
          <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? "rotate-180" : ""}`} />
        </button>

        <div className={`space-y-6 overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? "max-h-[1000px] opacity-100" : "max-h-0 opacity-0"}`}>
          {appearance && (
            <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
              <DetailSection title="Gender" content={appearance.gender} />
              <DetailSection title="Race" content={appearance.race || "Unknown"} />
              <DetailSection title="Height" content={appearance.height} />
              <DetailSection title="Weight" content={appearance.weight} />
            </div>
          )}

          {work && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <DetailSection title="Occupation" content={work.occupation} />
              <DetailSection title="Base" content={work.base} />
            </div>
          )}

          {connections && (
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              <DetailSection title="Group Affiliation" content={connections.groupAffiliation} />
              <DetailSection title="Relatives" content={connections.relatives} />
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};
