import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Link from "next/link";
import Button from "@/futureComponentLibrary/button/button";

type Props = {
  allPokemons: Array<PokemonTCG.Card & { isCollected?: boolean }>;
  selectedPokemonIndex: number | undefined;
  setSelectedPokemonIndex: React.Dispatch<
    React.SetStateAction<number | undefined>
  >;
  changeCollected: (id: string) => void;
};

const PokemonOverlay = (props: Props) => {
  const {
    allPokemons,
    selectedPokemonIndex,
    setSelectedPokemonIndex,
    changeCollected,
  } = props;
  
  const nextPokemon = () => {
    if (
      selectedPokemonIndex !== undefined &&
      selectedPokemonIndex + 1 > allPokemons.length - 1
    ) {
      return;
    } else if (selectedPokemonIndex !== undefined) {
      setSelectedPokemonIndex(selectedPokemonIndex + 1);
    }
  };

  const previousPokemon = () => {
    if (selectedPokemonIndex !== undefined && selectedPokemonIndex - 1 < 0) {
      return;
    } else if (selectedPokemonIndex !== undefined) {
      setSelectedPokemonIndex(selectedPokemonIndex - 1);
    }
  };

  return (
    <div className="h-full w-full bg-darkbg absolute top-0 left-0 flex flex-col">
      {selectedPokemonIndex !== undefined && (
        <>
          <div className="grow m-2 h-[80%]">
            <img
            className="h-[80%] m-auto"
              alt={allPokemons[selectedPokemonIndex].name}
              src={allPokemons[selectedPokemonIndex].images.large}
            />
          </div>

          <div className="flex justify-center mb-6">
            <label
              htmlFor="red-checkbox"
              className="mr-2 text-sm font-medium text-purple"
            >
              Collected
            </label>
            <input
              checked={allPokemons[selectedPokemonIndex].isCollected}
              onChange={() =>
                changeCollected(allPokemons[selectedPokemonIndex].id)
              }
              id="red-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-purple bg-gray-100 border-gray-300 rounded focus:ring-purple focus:ring-2"
            />
          </div>
        </>
      )}
      <div className="flex flex-row mx-4 mb-1 gap-1">
        <Button onClick={() => previousPokemon()} grow text="Previous" />
        <Button onClick={() => nextPokemon()} grow text="Next" />
      </div>
      <div className="flex mx-4 mb-4">
        <Button
          onClick={() => setSelectedPokemonIndex(undefined)}
          grow
          text="Close"
        />
      </div>
    </div>
  );
};

export default PokemonOverlay;
