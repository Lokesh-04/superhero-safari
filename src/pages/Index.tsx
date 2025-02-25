
import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { HeroCard } from "@/components/HeroCard";
import { Button } from "@/components/ui/button";
import { Shuffle } from "lucide-react";
import { toast } from "sonner";

const BaseURL = "https://superheroapi.com/api.php/472086168432227";

interface Hero {
  id: string;
  name: string;
  powerstats: {
    intelligence: string;
    strength: string;
    speed: string;
    durability: string;
    power: string;
    combat: string;
  };
  biography: {
    "full-name": string;
    publisher: string;
  };
  image: {
    url: string;
  };
}

const Index = () => {
  const [hero, setHero] = useState<Hero | null>(null);
  const [loading, setLoading] = useState(false);

  const fetchHero = async (id: number) => {
    try {
      setLoading(true);
      const response = await fetch(`${BaseURL}/${id}`);
      const data = await response.json();
      setHero(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching hero:", error);
      toast.error("Failed to fetch hero data. Please try again.");
      setLoading(false);
    }
  };

  const searchHero = async (name: string) => {
    try {
      setLoading(true);
      const response = await fetch(`${BaseURL}/search/${name}`);
      const data = await response.json();
      
      if (data.response === "success" && data.results?.length > 0) {
        setHero(data.results[0]);
      } else {
        toast.error("No hero found with that name!");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error searching hero:", error);
      toast.error("Failed to search hero. Please try again.");
      setLoading(false);
    }
  };

  const getRandomHero = () => {
    const randomId = Math.floor(Math.random() * 731) + 1;
    fetchHero(randomId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-hero-100 to-hero-200 py-12 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-hero-900">
            Superhero Explorer
          </h1>
          <p className="text-hero-600 text-lg max-w-2xl mx-auto">
            Discover superheroes from all universes. Search by name or get a random hero to explore their powers and story.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-2xl mx-auto">
          <div className="w-full">
            <SearchBar onSearch={searchHero} />
          </div>
          <Button
            onClick={getRandomHero}
            className="bg-hero-500 hover:bg-hero-600 text-white transition-all duration-300 whitespace-nowrap px-6"
            disabled={loading}
          >
            <Shuffle className="mr-2 h-4 w-4" />
            Random Hero
          </Button>
        </div>

        <div className="mt-12">
          {loading ? (
            <div className="w-full max-w-2xl mx-auto p-8 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-64 bg-gray-200 rounded-xl" />
                <div className="h-4 bg-gray-200 rounded w-3/4 mx-auto" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto" />
              </div>
            </div>
          ) : hero ? (
            <HeroCard
              name={hero.name}
              image={hero.image.url}
              powerstats={hero.powerstats}
              biography={{
                fullName: hero.biography["full-name"],
                publisher: hero.biography.publisher,
              }}
            />
          ) : (
            <div className="text-center text-gray-500 mt-12">
              Search for a hero or click "Random Hero" to get started!
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
