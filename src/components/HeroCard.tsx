
import { Shield, Bolt, Star } from "lucide-react";
import { Card } from "@/components/ui/card";

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
}

export const HeroCard = ({ name, image, powerstats, biography }: HeroCardProps) => {
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

  return (
    <Card className="w-full max-w-2xl mx-auto overflow-hidden bg-white/80 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl animate-fade-in">
      <div className="relative aspect-[16/9] overflow-hidden">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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
        <div className="grid grid-cols-3 gap-4 mb-6">
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
      </div>
    </Card>
  );
};
