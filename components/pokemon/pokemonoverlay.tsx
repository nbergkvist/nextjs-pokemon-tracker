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
      selectedPokemonIndex &&
      selectedPokemonIndex + 1 > allPokemons.length - 1
    ) {
      return;
    } else if (selectedPokemonIndex) {
      setSelectedPokemonIndex(selectedPokemonIndex + 1);
    }
  };

  const previousPokemon = () => {
    if (selectedPokemonIndex && selectedPokemonIndex - 1 < 0) {
      return;
    } else if (selectedPokemonIndex) {
      setSelectedPokemonIndex(selectedPokemonIndex - 1);
    }
  };

  return (
    <div className="h-full w-full bg-darkbg absolute top-0 left-0 flex flex-col">
      {selectedPokemonIndex !== undefined && (
        <div className="grow">
          <img
            alt={allPokemons[selectedPokemonIndex].name}
            src={allPokemons[selectedPokemonIndex].images.large}
          />
        </div>
      )}
      <div className="flex flex-row">
        <button className="grow" onClick={() => previousPokemon()}>Previous</button>
        <button className="grow" onClick={() => nextPokemon()}>Next</button>
      </div>
      <div className="flex">
      <button className="grow" onClick={() => setSelectedPokemonIndex(undefined)}>Close</button>
      </div>
    </div>
  );
};

export default PokemonOverlay;
