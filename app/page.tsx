import Sets from "@/components/sets/sets";
import { PokemonTCG } from "pokemon-tcg-sdk-typescript";

async function getData() {
  const sets = await PokemonTCG.getAllSets();
  return sets;
}

const Home = async () => {
  const allSets = await getData();
  return (
    <div className="w-full"><Sets allSets={allSets} /></div>
  );
};

export default Home;
