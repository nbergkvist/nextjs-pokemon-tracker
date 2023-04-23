import { PokemonTCG } from "pokemon-tcg-sdk-typescript";
import Link from "next/link";

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
      (selectedPokemonIndex !== undefined &&
      selectedPokemonIndex + 1 > allPokemons.length - 1)
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
          <div className="grow m-2">
            <img
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
              onChange={() => changeCollected(allPokemons[selectedPokemonIndex].id)}
              id="red-checkbox"
              type="checkbox"
              value=""
              className="w-4 h-4 text-purple bg-gray-100 border-gray-300 rounded focus:ring-purple focus:ring-2"
            />
          </div>
        </>
      )}
      <div className="flex flex-row">
        <button
          className="grow h-[42px] bg-purple text-black mx-4 mb-4"
          onClick={() => previousPokemon()}
        >
          Previous
        </button>
        <button
          className="grow h-[42px] bg-purple text-black mx-4 mb-4"
          onClick={() => nextPokemon()}
        >
          Next
        </button>
      </div>
      <div className="flex">
        <button
          className="grow h-[42px] bg-purple text-black mx-4 mb-4"
          onClick={() => setSelectedPokemonIndex(undefined)}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default PokemonOverlay;
